import type { OrderStatus, Status } from "@/lib/utils";

export type Product = {
  title: string;
  id: number;
  slug: string;
  price: number;
  category: string;
  inventory: number;
  description: string;
  status: string;
  time_updated: number;
  time_created: number;
  img: Uint8Array;
};

export type CartProduct = {
  product: Product;
  quantity: number;
};

export type Category = {
  name: string;
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
  id?: number;
  shippingAddress: ShippingAddress;
  products: CartProduct[];
  totalPrice: number;
  status?: OrderStatus;
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
