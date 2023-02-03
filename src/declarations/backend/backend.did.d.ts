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
  totalPrice: number;
}
export interface Order {
  id: OrderId__1;
  status: OrderStatus;
  paymentAddress: string;
  timeCreated: Time;
  shippingAddress: ShippingAddress;
  products: Array<OrderProduct>;
  totalPrice: number;
  transactionId: string;
}
export type OrderError =
  | { PaymentAddressAlreadyUsed: null }
  | { OrderNotFound: null }
  | { MissingData: null }
  | { UnableToCreate: null }
  | { UnableToUpdate: null };
export type OrderId = bigint;
export type OrderId__1 = bigint;
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
  status: { active: null } | { paused: null };
  time_created: Time;
  title: string;
  inventory: number;
  slug: string;
  description: string;
  time_updated: Time;
  category: SlugId__1;
  price: number;
}
export type ProductId = bigint;
export type Result = { ok: null } | { err: UpdateProductError };
export type Result_1 = { ok: null } | { err: UpdateCategoryError };
export type Result_10 = { ok: null } | { err: CreateProductError };
export type Result_11 = { ok: null } | { err: CreateCategoryError };
export type Result_12 = { ok: OrderStatus__1 } | { err: OrderError };
export type Result_2 = { ok: OrderId } | { err: OrderError };
export type Result_3 = { ok: null } | { err: GetParseError };
export type Result_4 = { ok: Product } | { err: GetProductError };
export type Result_5 = { ok: Category } | { err: GetCategoryError };
export type Result_6 = { ok: Order } | { err: OrderError };
export type Result_7 = { ok: string } | { err: GetDerivationError };
export type Result_8 = { ok: null } | { err: DeleteProductError };
export type Result_9 = { ok: null } | { err: DeleteCategoryError };
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
  status: { active: null } | { paused: null };
  title: string;
  inventory: number;
  description: string;
  category: SlugId__1;
  price: number;
}
export interface _SERVICE {
  checkOrderStatus: ActorMethod<[bigint], Result_12>;
  createOrder: ActorMethod<[NewOrder], Result_6>;
  create_category: ActorMethod<[string], Result_11>;
  create_product: ActorMethod<[UserProduct], Result_10>;
  deleteOwnerXPUB: ActorMethod<[], undefined>;
  delete_category: ActorMethod<[SlugId], Result_9>;
  delete_product: ActorMethod<[SlugId], Result_8>;
  generateNextPaymentAddress: ActorMethod<[], Result_7>;
  getOrder: ActorMethod<[bigint], Result_6>;
  getOwnerXPUB: ActorMethod<[], string>;
  get_category: ActorMethod<[SlugId], Result_5>;
  get_product: ActorMethod<[SlugId], Result_4>;
  listOrders: ActorMethod<[], Array<[OrderId, Order]>>;
  list_categories: ActorMethod<[], Array<[SlugId, Category]>>;
  list_products: ActorMethod<[], Array<[SlugId, Product]>>;
  setOwnerXPUB: ActorMethod<[string], Result_3>;
  setUserInputTransactionId: ActorMethod<[string, string], Result_2>;
  update_category: ActorMethod<[SlugId, string], Result_1>;
  update_product: ActorMethod<[SlugId, UserProduct], Result>;
}
