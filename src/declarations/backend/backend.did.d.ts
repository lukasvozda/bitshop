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
export type NoOpError = { NoOpError: null };
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
export type Result_10 = { ok: null } | { err: CreateCategoryError };
export type Result_2 = { ok: null } | { err: GetParseError };
export type Result_3 = { ok: null } | { err: NoOpError };
export type Result_4 = { ok: Product } | { err: GetProductError };
export type Result_5 = { ok: Category } | { err: GetCategoryError };
export type Result_6 = { ok: string } | { err: GetDerivationError };
export type Result_7 = { ok: null } | { err: DeleteProductError };
export type Result_8 = { ok: null } | { err: DeleteCategoryError };
export type Result_9 = { ok: null } | { err: CreateProductError };
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
  create_category: ActorMethod<[string], Result_10>;
  create_product: ActorMethod<[UserProduct], Result_9>;
  deleteOwnerXPUB: ActorMethod<[], undefined>;
  delete_category: ActorMethod<[SlugId], Result_8>;
  delete_product: ActorMethod<[SlugId], Result_7>;
  generateNextPaymentAddress: ActorMethod<[], Result_6>;
  getOwnerXPUB: ActorMethod<[], string>;
  get_category: ActorMethod<[SlugId], Result_5>;
  get_product: ActorMethod<[SlugId], Result_4>;
  list_categories: ActorMethod<[], Array<[SlugId, Category]>>;
  list_products: ActorMethod<[], Array<[SlugId, Product]>>;
  noOp: ActorMethod<[], Result_3>;
  setOwnerXPUB: ActorMethod<[string], Result_2>;
  update_category: ActorMethod<[SlugId, string], Result_1>;
  update_product: ActorMethod<[SlugId, UserProduct], Result>;
}
