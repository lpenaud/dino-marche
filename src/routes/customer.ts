import * as Router from "@koa/router";
import { Op } from "sequelize";
import Customer from "../models/customer";
import * as bcrypt from "../utils/bcrypt";
import * as jwt from "../utils/jwt";

const customerRouter = new Router({
  prefix: "/customer",
}).post("/", async (ctx, next) => {
  const customer = await Customer.findOne({
    where: {
      [Op.or]: [
        { login: ctx.request.body.login },
        { email: ctx.request.body.login },
      ],
    },
  });
  if (customer === null || await bcrypt.compare(ctx.request.body.password, customer.password) === false) {
    ctx.throw(418)
  } else {
    ctx.body = {
      token: await jwt.sign({ login: customer.login }),
    };
  }
  next();
}).post("/create", async (ctx, next) => {
  try {
    await Customer.create({
      lastName: ctx.request.body.lastName,
      name: ctx.request.body.name,
      phoneNumber: ctx.request.body.phoneNumber,
      email: ctx.request.body.email,
      login: ctx.request.body.login,
      password: ctx.request.body.password,
    });
    ctx.status = 201;
  } catch (err) {
    ctx.throw(418);
  }
  next();
});

export default customerRouter;
