import type { ActorMethod } from "@dfinity/agent";

export interface Category {
  name: string;
  slug: string;
}
export type CreateCategoryError =
  | { UserNotAdmin: null }
  | { CategoryAlreadyExists: null }
  | { UserNotAuthenticated: null }
  | { EmptyName: null };
export type CreateProductError =
  | { UserNotAdmin: null }
  | { UserNotAuthenticated: null }
  | { EmptyTitle: null };
export type DeleteCategoryError = { UserNotAdmin: null } | { UserNotAuthenticated: null };
export type DeleteProductError = { UserNotAdmin: null } | { UserNotAuthenticated: null };
export type GetCategoryError = { CategoryNotFound: null };
export type GetDerivationError =
  | { OwnerExtendedPubKeyNotSet: null }
  | { ChildKeyDerivationError: null }
  | { Base58PubKeyWrongFormatError: null };
export type GetParseError = { UserNotAuthenticated: null } | { Base58PubKeyWrongFormatError: null };
export type GetProductError = { ProductNotFound: null };
export type HeaderField = [string, string];
export type ImgId = string;
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
export interface PanelInfo {
  accountBalance: Satoshi;
  totalRevenue: Satoshi;
  ordersCount: bigint;
}
export interface Product {
  id: ProductId;
  img: ImgId;
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
export interface Request {
  url: string;
  method: string;
  body: Uint8Array | number[];
  headers: Array<HeaderField>;
}
export interface Response {
  body: Uint8Array | number[];
  headers: Array<HeaderField>;
  streaming_strategy: [] | [StreamingStrategy];
  status_code: number;
}
export type Result = { ok: Product } | { err: UpdateProductError };
export type Result_1 = { ok: Category } | { err: UpdateCategoryError };
export type Result_10 = { ok: null } | { err: DeleteProductError };
export type Result_11 = { ok: null } | { err: XPUBManipulationError };
export type Result_12 = { ok: null } | { err: DeleteCategoryError };
export type Result_13 = { ok: Product } | { err: CreateProductError };
export type Result_14 = { ok: Category } | { err: CreateCategoryError };
export type Result_15 = { ok: OrderStatus__1 } | { err: OrderError };
export type Result_2 = { ok: OrderId } | { err: OrderError };
export type Result_3 = { ok: null } | { err: GetParseError };
export type Result_4 = { ok: Product } | { err: GetProductError };
export type Result_5 = { ok: string } | { err: XPUBManipulationError };
export type Result_6 = { ok: Order } | { err: OrderError };
export type Result_7 = { ok: Category } | { err: GetCategoryError };
export type Result_8 = { ok: PanelInfo } | { err: XPUBManipulationError };
export type Result_9 = { ok: string } | { err: GetDerivationError };
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
export type StreamingCallback = ActorMethod<[StreamingCallbackToken], StreamingCallbackResponse>;
export interface StreamingCallbackResponse {
  token: [] | [StreamingCallbackToken];
  body: Uint8Array | number[];
}
export interface StreamingCallbackToken {
  key: string;
  index: bigint;
  content_encoding: string;
}
export type StreamingStrategy = {
  Callback: {
    token: StreamingCallbackToken;
    callback: StreamingCallback;
  };
};
export type Time = bigint;
export type UpdateCategoryError =
  | { UserNotAdmin: null }
  | { CategoryNotFound: null }
  | { UserNotAuthenticated: null }
  | { EmptyName: null };
export type UpdateProductError =
  | { UserNotAdmin: null }
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
export type XPUBManipulationError = { UserNotAuthenticated: null };
export interface _SERVICE {
  checkOrderStatus: ActorMethod<[string], Result_15>;
  createCategory: ActorMethod<[string], Result_14>;
  createOrder: ActorMethod<[NewOrder], Result_6>;
  createProduct: ActorMethod<[UserProduct, [] | [Uint8Array | number[]]], Result_13>;
  deleteCategory: ActorMethod<[SlugId], Result_12>;
  deleteOwnerXPUB: ActorMethod<[], Result_11>;
  deleteProduct: ActorMethod<[SlugId], Result_10>;
  generateNextPaymentAddress: ActorMethod<[], Result_9>;
  getAdminPanelInfo: ActorMethod<[], Result_8>;
  getCategory: ActorMethod<[SlugId], Result_7>;
  getOrder: ActorMethod<[string], Result_6>;
  getOwnerXPUB: ActorMethod<[], Result_5>;
  getProduct: ActorMethod<[SlugId], Result_4>;
  greet: ActorMethod<[string], string>;
  http_request: ActorMethod<[Request], Response>;
  listCategories: ActorMethod<[], Array<[SlugId, Category]>>;
  listOrders: ActorMethod<[], Array<[OrderId, Order]>>;
  listProducts: ActorMethod<[], Array<[SlugId, Product]>>;
  setOwnerXPUB: ActorMethod<[string], Result_3>;
  setUserInputTransactionId: ActorMethod<[string, string], Result_2>;
  updateCategory: ActorMethod<[SlugId, string], Result_1>;
  updateProduct: ActorMethod<[SlugId, UserProduct, [] | [Uint8Array | number[]]], Result>;
}
