export interface IClient {
  id: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  email: string;
  login: string;
  password: string;
}

export interface IDelivery {
  id: string;
  shippingDate: Date;
  deliveryDate: Date;
}

export interface IAdress {
  zipCode: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
}

export interface IOrder {
  id: string;
  orderDate: Date;
  canceled: boolean;
}

export interface IPayment {
  id: string;
  paymentMethod: string;
  paymentDate: Date;
}

export interface IDinosaur {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  birthDate: Date;
}

export interface IEgg {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  hatchDate: Date;
}

export interface IFood {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  quantity: number;
}

export interface IGoodie {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
}

export interface IDiet {
  id: string;
  name: string;
}

export interface ISpecies { 
  id: string;
  name: string;
  otherName: string;
  size: number;
  length: number;
  weight: number;
}

