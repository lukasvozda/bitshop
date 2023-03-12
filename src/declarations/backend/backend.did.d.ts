import type { ActorMethod } from "@dfinity/agent";

export interface Category {
  name: string;
  slug: string;
}
export type CreateCategoryError =
  | { CategoryAlreadyExists: null }
  | { UserNotAuthenticated: null }
  | { EmptyName: null };
export type CreateProductError = { UserNotAuthenticated: null } | { EmptyTitle: null };
export type DeleteCategoryError = { UserNotAuthenticated: null };
export type DeleteProductError = { UserNotAuthenticated: null };
export type GetCategoryError = { CategoryNotFound: null };
export type GetDerivationError =
  | { OwnerExtendedPubKeyNotSet: null }
  | { ChildKeyDerivationError: null }
  | { Base58PubKeyWrongFormatError: null };
export type GetParseError = { Base58PubKeyWrongFormatError: null };
export type GetProductError = { ProductNotFound: null };
export interface NewOrder {
  paymentAddress: string;
  shippingAddress: ShippingAddress;
  products: Array<OrderProduct>;
  totalPrice: Satoshi;
}
export interface Order {
  id: OrderId__1;
  status: OrderStatus;
  paymentAddress: string;
  timeCreated: Time;
  shippingAddress: ShippingAddress;
  products: Array<OrderProduct>;
  totalPrice: Satoshi;
  transactionId: string;
}
export type OrderError =
  | { PaymentAddressAlreadyUsed: null }
  | { OrderNotFound: null }
  | { MissingData: null }
  | { UnableToCreate: null }
  | { UnableToUpdate: null };
export type OrderId = string;
export type OrderId__1 = string;
export interface OrderProduct {
  id: ProductId;
  quantity: number;
}
export type OrderStatus =
  | { TransactionIdSet: null }
  | { UserConfirmedPayment: null }
  | { Verified: null };
export type OrderStatus__1 =
  | { TransactionIdSet: null }
  | { UserConfirmedPayment: null }
  | { Verified: null };
export interface Product {
  id: ProductId;
  img: Uint8Array;
  time_created: Time;
  title: string;
  active: boolean;
  inventory: number;
  slug: string;
  description: string;
  time_updated: Time;
  category: SlugId__1;
  price: number;
}
export type ProductId = bigint;
export type Result = { ok: Product } | { err: UpdateProductError };
export type Result_1 = { ok: Category } | { err: UpdateCategoryError };
export type Result_10 = { ok: Product } | { err: CreateProductError };
export type Result_11 = { ok: Category } | { err: CreateCategoryError };
export type Result_12 = { ok: OrderStatus__1 } | { err: OrderError };
export type Result_2 = { ok: OrderId } | { err: OrderError };
export type Result_3 = { ok: null } | { err: GetParseError };
export type Result_4 = { ok: Product } | { err: GetProductError };
export type Result_5 = { ok: Order } | { err: OrderError };
export type Result_6 = { ok: Category } | { err: GetCategoryError };
export type Result_7 = { ok: string } | { err: GetDerivationError };
export type Result_8 = { ok: null } | { err: DeleteProductError };
export type Result_9 = { ok: null } | { err: DeleteCategoryError };
export type Satoshi = bigint;
export interface ShippingAddress {
  postCode: string;
  street: string;
  country: string;
  city: string;
  mail: string;
  county: string;
  lastName: string;
  firstName: string;
}
export type SlugId = string;
export type SlugId__1 = string;
export type Time = bigint;
export type UpdateCategoryError =
  | { CategoryNotFound: null }
  | { UserNotAuthenticated: null }
  | { EmptyName: null };
export type UpdateProductError =
  | { ProductNotFound: null }
  | { UserNotAuthenticated: null }
  | { EmptyTitle: null };
export interface UserProduct {
  title: string;
  active: boolean;
  inventory: number;
  description: string;
  category: SlugId__1;
  price: number;
}
export interface _SERVICE {
  checkOrderStatus: ActorMethod<[string], Result_12>;
  createCategory: ActorMethod<[string], Result_11>;
  createOrder: ActorMethod<[NewOrder], Result_5>;
  createProduct: ActorMethod<[UserProduct], Result_10>;
  deleteCategory: ActorMethod<[SlugId], Result_9>;
  deleteOwnerXPUB: ActorMethod<[], undefined>;
  deleteProduct: ActorMethod<[SlugId], Result_8>;
  generateNextPaymentAddress: ActorMethod<[], Result_7>;
  getCategory: ActorMethod<[SlugId], Result_6>;
  getOrder: ActorMethod<[string], Result_5>;
  getOwnerXPUB: ActorMethod<[], string>;
  getProduct: ActorMethod<[SlugId], Result_4>;
  greet: ActorMethod<[string], string>;
  listCategories: ActorMethod<[], Array<[SlugId, Category]>>;
  listOrders: ActorMethod<[], Array<[OrderId, Order]>>;
  listProducts: ActorMethod<[], Array<[SlugId, Product]>>;
  setOwnerXPUB: ActorMethod<[string], Result_3>;
  setUserInputTransactionId: ActorMethod<[string, string], Result_2>;
  updateCategory: ActorMethod<[SlugId, string], Result_1>;
  updateProduct: ActorMethod<[SlugId, UserProduct], Result>;
}
