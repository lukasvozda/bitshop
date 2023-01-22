import type { OrderStatus, Status } from "@/lib/utils";

export type Product = {
  title: string;
  id: number;
  price: number;
  category: number;
};

export type CartProduct = {
  product: Product;
  quantity: number;
};

export type Category = {
  name: string;
  id: number;
  slug: string;
};

export type ShippingAddress = {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
  county: string | null;
};

export type Order = {
  id: number;
  shippingAddress: ShippingAddress;
  products: Product[];
  totalPrice: number;
  status: OrderStatus;
  paymentAddress: string;
};

export type ApiResponse = {
  ok?: any;
  err?: any;
};

export type Alert = {
  time: string;
  type: Status;
  message: string;
};
