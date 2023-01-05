import type { ActorMethod } from '@dfinity/agent';

export type CreateProductError = { UserNotAuthenticated: null } | { EmptyTitle: null };
export type DeleteProductError = { UserNotAuthenticated: null };
export type GetProductError = { ProductNotFound: null };
export interface Product {
	id: ProductId;
	title: string;
	price: bigint;
}
export type ProductId = bigint;
export type Result = { ok: null } | { err: UpdateProductError };
export type Result_1 = { ok: Product } | { err: GetProductError };
export type Result_2 = { ok: null } | { err: DeleteProductError };
export type Result_3 = { ok: null } | { err: CreateProductError };
export type UpdateProductError =
	| { ProductNotFound: null }
	| { UserNotAuthenticated: null }
	| { EmptyTitle: null };
export interface _SERVICE {
	create_product: ActorMethod<[{ title: string; price: bigint }], Result_3>;
	delete: ActorMethod<[ProductId], Result_2>;
	get_product: ActorMethod<[ProductId], Result_1>;
	greet: ActorMethod<[string], string>;
	list_products: ActorMethod<[], Array<[ProductId, Product]>>;
	update_product: ActorMethod<[ProductId, { title: string; price: bigint }], Result>;
}
