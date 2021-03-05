export interface IAdress {
  id: string;
  zipCode: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  payments: IPayment[];
}

export interface ICustomer {
  id: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  email: string;
  login: string;
  passwordHash: string;
  password: string;
  orders: IOrder[];
}

export interface IDiet {
  id: string;
  name: string;
  products: IProduct[];
  species: ISpecies[];
}

export interface IFeedback {
  customerId: string;
  productId: string;
  text: string;
  stars: number;
  product: IProduct;
  customer: ICustomer;
  title: string;
}

export type ImageMimeType = "image/jpeg" | "image/png" | "image/webp";

export interface IImage {
  id: string;
  mimeType: ImageMimeType;
  pathname: string;
}

// Timestamps
export interface IOrder {
  id: string;
  orderDate: Date;
  client: ICustomer;
  payment: IPayment;  
  products: IProduct[];
}

export interface IPayment {
  id: string;
  paymentMethod: string;
  paymentDate: Date;
  cardNumbers: string;
  CVC: string;
  expirationDate: Date;
  order: IOrder;
  adress: IAdress;
}

export type ProductType = "Dinosaur" | "Egg" | "Food" | "Goodie";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  layDate: Date;
  hatchDate: Date;
  type: ProductType;
  orders: IOrder[];
  diet: IDiet;
  species: ISpecies;
  images: IImage[];
  feedbacks: IFeedback[];
}

export interface ISpecies { 
  id: string;
  name: string;
  otherName: string;
  size: number;
  length: number;
  weight: number;
  diet: IDiet;
  products: IProduct[];
}
