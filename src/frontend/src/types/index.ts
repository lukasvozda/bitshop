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

export enum OrderStatus {
  INITIATED,
  WAITING_FOR_PAYMENT,
  CONFIRMED,
  FINISHED
}

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

export enum STATUS {
  SUCCESS,
  ERROR
}

export type Alert = {
  time: string;
  type: STATUS;
  message: string;
};
