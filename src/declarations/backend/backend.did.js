export const idlFactory = ({ IDL }) => {
  const OrderStatus__1 = IDL.Variant({
    TransactionIdSet: IDL.Null,
    UserConfirmedPayment: IDL.Null,
    Verified: IDL.Null
  });
  const OrderError = IDL.Variant({
    PaymentAddressAlreadyUsed: IDL.Null,
    OrderNotFound: IDL.Null,
    MissingData: IDL.Null,
    UnableToCreate: IDL.Null,
    UnableToUpdate: IDL.Null
  });
  const Result_12 = IDL.Variant({ ok: OrderStatus__1, err: OrderError });
  const ShippingAddress = IDL.Record({
    postCode: IDL.Text,
    street: IDL.Text,
    country: IDL.Text,
    city: IDL.Text,
    mail: IDL.Text,
    county: IDL.Text,
    lastName: IDL.Text,
    firstName: IDL.Text
  });
  const ProductId = IDL.Nat;
  const OrderProduct = IDL.Record({ id: ProductId, quantity: IDL.Nat8 });
  const NewOrder = IDL.Record({
    paymentAddress: IDL.Text,
    shippingAddress: ShippingAddress,
    products: IDL.Vec(OrderProduct),
    totalPrice: IDL.Float64
  });
  const OrderId__1 = IDL.Nat;
  const OrderStatus = IDL.Variant({
    TransactionIdSet: IDL.Null,
    UserConfirmedPayment: IDL.Null,
    Verified: IDL.Null
  });
  const Time = IDL.Int;
  const Order = IDL.Record({
    id: OrderId__1,
    status: OrderStatus,
    paymentAddress: IDL.Text,
    timeCreated: Time,
    shippingAddress: ShippingAddress,
    products: IDL.Vec(OrderProduct),
    totalPrice: IDL.Float64,
    transactionId: IDL.Text
  });
  const Result_6 = IDL.Variant({ ok: Order, err: OrderError });
  const CreateCategoryError = IDL.Variant({
    CategoryAlreadyExists: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyName: IDL.Null
  });
  const Result_11 = IDL.Variant({
    ok: IDL.Null,
    err: CreateCategoryError
  });
  const SlugId__1 = IDL.Text;
  const UserProduct = IDL.Record({
    status: IDL.Variant({ active: IDL.Null, paused: IDL.Null }),
    title: IDL.Text,
    inventory: IDL.Nat8,
    description: IDL.Text,
    category: SlugId__1,
    price: IDL.Float64
  });
  const CreateProductError = IDL.Variant({
    UserNotAuthenticated: IDL.Null,
    EmptyTitle: IDL.Null
  });
  const Result_10 = IDL.Variant({
    ok: IDL.Null,
    err: CreateProductError
  });
  const SlugId = IDL.Text;
  const DeleteCategoryError = IDL.Variant({
    UserNotAuthenticated: IDL.Null
  });
  const Result_9 = IDL.Variant({
    ok: IDL.Null,
    err: DeleteCategoryError
  });
  const DeleteProductError = IDL.Variant({ UserNotAuthenticated: IDL.Null });
  const Result_8 = IDL.Variant({ ok: IDL.Null, err: DeleteProductError });
  const GetDerivationError = IDL.Variant({
    OwnerExtendedPubKeyNotSet: IDL.Null,
    ChildKeyDerivationError: IDL.Null,
    Base58PubKeyWrongFormatError: IDL.Null
  });
  const Result_7 = IDL.Variant({ ok: IDL.Text, err: GetDerivationError });
  const Category = IDL.Record({ name: IDL.Text, slug: IDL.Text });
  const GetCategoryError = IDL.Variant({ CategoryNotFound: IDL.Null });
  const Result_5 = IDL.Variant({ ok: Category, err: GetCategoryError });
  const Product = IDL.Record({
    id: ProductId,
    img: IDL.Vec(IDL.Nat8),
    status: IDL.Variant({ active: IDL.Null, paused: IDL.Null }),
    time_created: Time,
    title: IDL.Text,
    inventory: IDL.Nat8,
    slug: IDL.Text,
    description: IDL.Text,
    time_updated: Time,
    category: SlugId__1,
    price: IDL.Float64
  });
  const GetProductError = IDL.Variant({ ProductNotFound: IDL.Null });
  const Result_4 = IDL.Variant({ ok: Product, err: GetProductError });
  const OrderId = IDL.Nat;
  const GetParseError = IDL.Variant({
    Base58PubKeyWrongFormatError: IDL.Null
  });
  const Result_3 = IDL.Variant({ ok: IDL.Null, err: GetParseError });
  const Result_2 = IDL.Variant({ ok: OrderId, err: OrderError });
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
    checkOrderStatus: IDL.Func([IDL.Nat], [Result_12], []),
    createOrder: IDL.Func([NewOrder], [Result_6], []),
    create_category: IDL.Func([IDL.Text], [Result_11], []),
    create_product: IDL.Func([UserProduct], [Result_10], []),
    deleteOwnerXPUB: IDL.Func([], [], ["oneway"]),
    delete_category: IDL.Func([SlugId], [Result_9], []),
    delete_product: IDL.Func([SlugId], [Result_8], []),
    generateNextPaymentAddress: IDL.Func([], [Result_7], []),
    getOrder: IDL.Func([IDL.Nat], [Result_6], ["query"]),
    getOwnerXPUB: IDL.Func([], [IDL.Text], ["query"]),
    get_category: IDL.Func([SlugId], [Result_5], ["query"]),
    get_product: IDL.Func([SlugId], [Result_4], ["query"]),
    listOrders: IDL.Func([], [IDL.Vec(IDL.Tuple(OrderId, Order))], ["query"]),
    list_categories: IDL.Func([], [IDL.Vec(IDL.Tuple(SlugId, Category))], ["query"]),
    list_products: IDL.Func([], [IDL.Vec(IDL.Tuple(SlugId, Product))], ["query"]),
    setOwnerXPUB: IDL.Func([IDL.Text], [Result_3], []),
    setUserInputTransactionId: IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    update_category: IDL.Func([SlugId, IDL.Text], [Result_1], []),
    update_product: IDL.Func([SlugId, UserProduct], [Result], [])
  });
};
export const init = ({ IDL }) => {
  return [];
};
