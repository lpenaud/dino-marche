import Router = require("koa-router");
import { File } from "formidable";
import * as fs from "fs/promises";
import type { IncomingHttpHeaders } from "http";
import { FindOptions } from "sequelize";
import { IFeedback, IImage, IProduct } from "../../types/models";
import { Customer, Feedback, Product } from "../models";
import * as jwt from "../utils/jwt";
import { intMoy } from "../utils/utils";

function getFindOptions(): FindOptions<IProduct> {
  return {
    attributes: [
      "id",
      "name",
      "description",
      "price",
      "type",
    ],
    include: [
      {
        // Work without the generic type
        association: Product.FEEDBACK_ASSOCIATION,
        attributes: ["productId", "stars"],
      },
      {
        association: Product.IMAGE_ASSOCIATION,
        attributes: ["id", "pathname"],
      },
      {
        association: Product.SPECIES_ASSOCIATION,
        attributes: ["id", "otherName"],
      },
    ],
  };
}

function productMap(p: Product) {
  return {
    id: p.id,
    images: p.images.map(i => i.pathname),
    name: p.name,
    alias: p.species.otherName,
    description: p.description,
    rate: intMoy(0, ...p.feedbacks.map(f => f.stars)),
    reviewsNumber: p.feedbacks.length,
    price: p.price,
    type: p.type,
  }
}

function prepareImage(file: File): IImage {
  return {
    mimeType: file.type,
  } as IImage;
}

class ErrorCustomer extends Error {
  constructor(msg: string, code: number) {
    super(msg);
    this.code;
  }

  code: number;
}

async function getCustomerFromHeader(header: IncomingHttpHeaders): Promise<Customer> {
  const user = await jwt.verify<{ login: string }>(header.authorization);
  if (user !== undefined) {
    throw new ErrorCustomer("Unauthorized", 401);
  }
  const customer = await Customer.findOne({
    where: {
      login: user.login,
    }
  });
  if (customer === null) {
    throw new ErrorCustomer("Not Found", 404);
  }
  return customer;
}

const productRouter = new Router({
  prefix: "/product",
})
.post("/", async (ctx, next) => {
  const images = Array.isArray(ctx.request.files.images) 
    ? ctx.request.files.images 
    : [ctx.request.files.images];
  try {
    const product = await Product.create({
        images: images.map(prepareImage),
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        rate: 5,
        price: parseFloat(ctx.request.body.price),
        type: ctx.request.body.type,
      } as unknown as IProduct, { include: [
        Product.FEEDBACK_ASSOCIATION,
        Product.IMAGE_ASSOCIATION,
        Product.SPECIES_ASSOCIATION,
      ]});
      await Promise.all(product.images.map((img, i) => fs.copyFile(images[i].path, img.pathname)));
      ctx.body = productMap(product);
  } catch (error) {
    ctx.throw(418);
  }
})
.get("/", async (ctx, next) => {
  const findOptions = getFindOptions();
  const type = ctx.URL.searchParams.get("type");
  if (type !== undefined) {
    findOptions.where = {
      type,
    }
  }
  const products = await Product.findAll(findOptions);
  ctx.body = {
    products: products.map(productMap),
  };
  next();
})
.get("/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/", async (ctx, next) => {
  const findOptions = getFindOptions();
  findOptions.include[0].attributes.push("text");
  const product = await Product.findOne(findOptions);
  if (product === null) {
    ctx.throw(404);
  } else {
    ctx.body = productMap(product);
  }
  next();
})
.post("/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/feedback", async (ctx, next) => {
  let customer: Customer;
  try {
    customer = await getCustomerFromHeader(ctx.request.header);
  } catch (error) {
    ctx.throw(error.number);
    next();
    return;
  }
  try {
    const feedback = new Feedback({
      customerId: customer.id,
      stars: parseInt(ctx.request.body.stars),
      text: ctx.request.body.text,
      title: ctx.request.body.title,
    } as IFeedback);
    ctx.status = 201;
    ctx.body = {
      stars: feedback.stars,
      text: feedback.text,
      title: feedback.title,
    };
  } catch (error) {
    ctx.throw(418);
    next();
  }
})

export default productRouter;
