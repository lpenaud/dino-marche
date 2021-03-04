import Router = require("koa-router");
import { Op } from "sequelize";
import Customer from "../models/customer";
import { compare } from "../utils/bcrypt";
import { HTTP_CODES } from "../utils/http";
import * as jwt from "../utils/jwt";

const customerRouter = new Router({
  prefix: "/customer",
})
.post("/", async (ctx, next) => {
  const customer = await Customer.findOne({
    where: {
      [Op.or]: [
        { login: ctx.request.body.login },
        { email: ctx.request.body.login },
      ]
    },
  });
  if (customer === null || await compare(ctx.request.body.password, customer.password) === false) {
    HTTP_CODES[418].send(ctx);
  } else {
    ctx.body = {
      token: await jwt.sign({ login: customer.login }),
    };
  }
  next();
})
.post("/create", async (ctx, next) => {
  try {
    await Customer.create({
      lastName: ctx.request.body.lastName,
      name: ctx.request.body.name,
      phoneNumber: ctx.request.body.phoneNumber,
      email: ctx.request.body.email,
      login: ctx.request.body.login,
      password: ctx.request.body.password,
    });
    HTTP_CODES[201].send(ctx);
  } catch (err) {
    HTTP_CODES[418].send(ctx, err.message);
  }
  next();
});

export default customerRouter;

