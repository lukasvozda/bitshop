export const idlFactory = ({ IDL }) => {
  const CreateCategoryError = IDL.Variant({
    CategoryAlreadyExists: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyName: IDL.Null
  });
  const Result_9 = IDL.Variant({
    ok: IDL.Null,
    err: CreateCategoryError
  });
  const CategoryId = IDL.Nat;
  const CreateProductError = IDL.Variant({
    UserNotAuthenticated: IDL.Null,
    EmptyTitle: IDL.Null
  });
  const Result_8 = IDL.Variant({ ok: IDL.Null, err: CreateProductError });
  const DeleteCategoryError = IDL.Variant({
    UserNotAuthenticated: IDL.Null
  });
  const Result_7 = IDL.Variant({
    ok: IDL.Null,
    err: DeleteCategoryError
  });
  const ProductId = IDL.Nat;
  const DeleteProductError = IDL.Variant({ UserNotAuthenticated: IDL.Null });
  const Result_6 = IDL.Variant({ ok: IDL.Null, err: DeleteProductError });
  const GetDerivationError = IDL.Variant({
    OwnerExtendedPubKeyNotSet: IDL.Null,
    ChildKeyDerivationError: IDL.Null,
    Base58PubKeyWrongFormatError: IDL.Null
  });
  const Result_5 = IDL.Variant({ ok: IDL.Text, err: GetDerivationError });
  const Category = IDL.Record({
    id: CategoryId,
    name: IDL.Text,
    slug: IDL.Text
  });
  const GetCategoryError = IDL.Variant({ CategoryNotFound: IDL.Null });
  const Result_4 = IDL.Variant({ ok: Category, err: GetCategoryError });
  const Product = IDL.Record({
    id: ProductId,
    title: IDL.Text,
    category: CategoryId,
    price: IDL.Nat
  });
  const GetProductError = IDL.Variant({ ProductNotFound: IDL.Null });
  const Result_3 = IDL.Variant({ ok: Product, err: GetProductError });
  const GetParseError = IDL.Variant({
    Base58PubKeyWrongFormatError: IDL.Null
  });
  const Result_2 = IDL.Variant({ ok: IDL.Null, err: GetParseError });
  const UpdateCategoryError = IDL.Variant({
    CategoryNotFound: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyName: IDL.Null
  });
  const Result_1 = IDL.Variant({
    ok: IDL.Null,
    err: UpdateCategoryError
  });
  const UpdateProductError = IDL.Variant({
    ProductNotFound: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyTitle: IDL.Null
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: UpdateProductError });
  return IDL.Service({
    create_category: IDL.Func([IDL.Record({ name: IDL.Text, slug: IDL.Text })], [Result_9], []),
    create_product: IDL.Func(
      [
        IDL.Record({
          title: IDL.Text,
          category: CategoryId,
          price: IDL.Nat
        })
      ],
      [Result_8],
      []
    ),
    deleteOwnerXPUB: IDL.Func([], [], ["oneway"]),
    delete_category: IDL.Func([CategoryId], [Result_7], []),
    delete_product: IDL.Func([ProductId], [Result_6], []),
    generateNextPaymentAddress: IDL.Func([], [Result_5], []),
    getOwnerXPUB: IDL.Func([], [IDL.Text], ["query"]),
    get_category: IDL.Func([CategoryId], [Result_4], ["query"]),
    get_product: IDL.Func([ProductId], [Result_3], ["query"]),
    greet: IDL.Func([IDL.Text], [IDL.Text], []),
    list_categories: IDL.Func([], [IDL.Vec(IDL.Tuple(CategoryId, Category))], ["query"]),
    list_products: IDL.Func([], [IDL.Vec(IDL.Tuple(ProductId, Product))], ["query"]),
    setOwnerXPUB: IDL.Func([IDL.Text], [Result_2], []),
    update_category: IDL.Func(
      [CategoryId, IDL.Record({ name: IDL.Text, slug: IDL.Text })],
      [Result_1],
      []
    ),
    update_product: IDL.Func(
      [
        ProductId,
        IDL.Record({
          title: IDL.Text,
          category: CategoryId,
          price: IDL.Nat
        })
      ],
      [Result],
      []
    )
  });
};
export const init = ({ IDL }) => {
  return [];
};
