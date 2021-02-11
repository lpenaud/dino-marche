import { Adress, Client, Delivery, Diet, Order, Payment, Species } from "../src/models";
import Product from "../src/models/product";

export interface IAdress {
  zipCode: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  deliveries: Delivery[];
  payments: Payment[];
}

export interface IClient {
  id: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  email: string;
  login: string;
  password: string;
  orders: Order[];
}

export interface IDelivery {
  id: string;
  shippingDate: Date;
  deliveryDate: Date;
  adressId: string;
  adress: Adress;
  order: Order;
}

export interface IDiet {
  id: string;
  name: string;
  products: Product[];
  species: Species[];
}

export interface IOrder {
  id: string;
  orderDate: Date;
  canceled: boolean;
  clientId: string;
  client: Client;
  delivery: Delivery;
  payment: Payment;
  products: Product[];
}

export interface IOrderProduct {
  orderId: string;
  productId: string;
}

export interface IPayment {
  id: string;
  paymentMethod: string;
  paymentDate: Date;
  cardNumbers: string;
  CVC: string;
  expirationDate: Date;
  order: Order;
  adressId: string;
  adress: Adress;
}

export interface IProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  birthDate: Date;
  hatchDate: Date;
  quantity: number;
}

export interface ISpecies { 
  id: string;
  name: string;
  otherName: string;
  size: number;
  length: number;
  weight: number;
  dietId: string;
  diet: Diet;
  products: Product[];
}
