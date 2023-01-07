import type { ActorMethod } from '@dfinity/agent';

export interface Category {
	id: CategoryId;
	name: string;
	slug: string;
}
export type CategoryId = bigint;
export type CreateCategoryError =
	| { CategoryAlreadyExists: null }
	| { UserNotAuthenticated: null }
	| { EmptyName: null };
export type CreateProductError = { UserNotAuthenticated: null } | { EmptyTitle: null };
export type DeleteCategoryError = { UserNotAuthenticated: null };
export type DeleteProductError = { UserNotAuthenticated: null };
export type GetCategoryError = { CategoryNotFound: null };
export type GetProductError = { ProductNotFound: null };
export interface Product {
	id: ProductId;
	title: string;
	category: CategoryId;
	price: bigint;
}
export type ProductId = bigint;
export type Result = { ok: null } | { err: UpdateProductError };
export type Result_1 = { ok: null } | { err: UpdateCategoryError };
export type Result_2 = { ok: Product } | { err: GetProductError };
export type Result_3 = { ok: Category } | { err: GetCategoryError };
export type Result_4 = { ok: null } | { err: DeleteProductError };
export type Result_5 = { ok: null } | { err: DeleteCategoryError };
export type Result_6 = { ok: null } | { err: CreateProductError };
export type Result_7 = { ok: null } | { err: CreateCategoryError };
export type UpdateCategoryError =
	| { CategoryNotFound: null }
	| { UserNotAuthenticated: null }
	| { EmptyName: null };
export type UpdateProductError =
	| { ProductNotFound: null }
	| { UserNotAuthenticated: null }
	| { EmptyTitle: null };
export interface _SERVICE {
	create_category: ActorMethod<[{ name: string; slug: string }], Result_7>;
	create_product: ActorMethod<[{ title: string; category: CategoryId; price: bigint }], Result_6>;
	delete_category: ActorMethod<[CategoryId], Result_5>;
	delete_product: ActorMethod<[ProductId], Result_4>;
	get_category: ActorMethod<[CategoryId], Result_3>;
	get_product: ActorMethod<[ProductId], Result_2>;
	greet: ActorMethod<[string], string>;
	list_categories: ActorMethod<[], Array<[CategoryId, Category]>>;
	list_products: ActorMethod<[], Array<[ProductId, Product]>>;
	update_category: ActorMethod<[CategoryId, { name: string; slug: string }], Result_1>;
	update_product: ActorMethod<
		[ProductId, { title: string; category: CategoryId; price: bigint }],
		Result
	>;
}
