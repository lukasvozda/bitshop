export const idlFactory = ({ IDL }) => {
	const CreateProductError = IDL.Variant({
		UserNotAuthenticated: IDL.Null,
		EmptyTitle: IDL.Null
	});
	const Result_3 = IDL.Variant({ ok: IDL.Null, err: CreateProductError });
	const ProductId = IDL.Nat;
	const DeleteProductError = IDL.Variant({ UserNotAuthenticated: IDL.Null });
	const Result_2 = IDL.Variant({ ok: IDL.Null, err: DeleteProductError });
	const Product = IDL.Record({
		id: ProductId,
		title: IDL.Text,
		price: IDL.Nat
	});
	const GetProductError = IDL.Variant({ ProductNotFound: IDL.Null });
	const Result_1 = IDL.Variant({ ok: Product, err: GetProductError });
	const UpdateProductError = IDL.Variant({
		ProductNotFound: IDL.Null,
		UserNotAuthenticated: IDL.Null,
		EmptyTitle: IDL.Null
	});
	const Result = IDL.Variant({ ok: IDL.Null, err: UpdateProductError });
	return IDL.Service({
		create_product: IDL.Func([IDL.Record({ title: IDL.Text, price: IDL.Nat })], [Result_3], []),
		delete: IDL.Func([ProductId], [Result_2], []),
		get_product: IDL.Func([ProductId], [Result_1], ['query']),
		greet: IDL.Func([IDL.Text], [IDL.Text], []),
		list_products: IDL.Func([], [IDL.Vec(IDL.Tuple(ProductId, Product))], ['query']),
		update_product: IDL.Func(
			[ProductId, IDL.Record({ title: IDL.Text, price: IDL.Nat })],
			[Result],
			[]
		)
	});
};
export const init = ({ IDL }) => {
	return [];
};
