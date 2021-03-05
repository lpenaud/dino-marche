import Router = require("koa-router");
import { File } from "formidable";
import * as fs from "fs/promises";
import { FindOptions } from "sequelize";
import { IImage, IProduct } from "../../types/models";
import { Product } from "../models";
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
  const products = await Product.findAll(getFindOptions());
  ctx.body = {
    products: products.map(productMap),
  };
  next();
})
.get("/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/", async (ctx, next) => {
  const product = await Product.findOne(getFindOptions());
  if (product === null) {
    ctx.throw(404);
  } else {
    ctx.body = productMap(product);
  }
  next();
})

export default productRouter;
