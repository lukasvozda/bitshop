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
  const Result_15 = IDL.Variant({ ok: OrderStatus__1, err: OrderError });
  const Category = IDL.Record({ name: IDL.Text, slug: IDL.Text });
  const CreateCategoryError = IDL.Variant({
    CategoryAlreadyExists: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyName: IDL.Null
  });
  const Result_14 = IDL.Variant({
    ok: Category,
    err: CreateCategoryError
  });
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
  const Satoshi = IDL.Nat64;
  const NewOrder = IDL.Record({
    paymentAddress: IDL.Text,
    shippingAddress: ShippingAddress,
    products: IDL.Vec(OrderProduct),
    totalPrice: Satoshi
  });
  const OrderId__1 = IDL.Text;
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
    totalPrice: Satoshi,
    transactionId: IDL.Text
  });
  const Result_6 = IDL.Variant({ ok: Order, err: OrderError });
  const SlugId__1 = IDL.Text;
  const UserProduct = IDL.Record({
    title: IDL.Text,
    active: IDL.Bool,
    inventory: IDL.Nat8,
    description: IDL.Text,
    category: SlugId__1,
    price: IDL.Float64
  });
  const ImgId = IDL.Text;
  const Product = IDL.Record({
    id: ProductId,
    img: ImgId,
    time_created: Time,
    title: IDL.Text,
    active: IDL.Bool,
    inventory: IDL.Nat8,
    slug: IDL.Text,
    description: IDL.Text,
    time_updated: Time,
    category: SlugId__1,
    price: IDL.Float64
  });
  const CreateProductError = IDL.Variant({
    UserNotAuthenticated: IDL.Null,
    EmptyTitle: IDL.Null
  });
  const Result_13 = IDL.Variant({ ok: Product, err: CreateProductError });
  const SlugId = IDL.Text;
  const DeleteCategoryError = IDL.Variant({
    UserNotAuthenticated: IDL.Null
  });
  const Result_12 = IDL.Variant({
    ok: IDL.Null,
    err: DeleteCategoryError
  });
  const XPUBManipulationError = IDL.Variant({
    UserNotAuthenticated: IDL.Null
  });
  const Result_11 = IDL.Variant({
    ok: IDL.Null,
    err: XPUBManipulationError
  });
  const DeleteProductError = IDL.Variant({ UserNotAuthenticated: IDL.Null });
  const Result_10 = IDL.Variant({
    ok: IDL.Null,
    err: DeleteProductError
  });
  const GetDerivationError = IDL.Variant({
    OwnerExtendedPubKeyNotSet: IDL.Null,
    ChildKeyDerivationError: IDL.Null,
    Base58PubKeyWrongFormatError: IDL.Null
  });
  const Result_9 = IDL.Variant({ ok: IDL.Text, err: GetDerivationError });
  const PanelInfo = IDL.Record({
    accountBalance: Satoshi,
    totalRevenue: Satoshi,
    ordersCount: IDL.Nat
  });
  const Result_8 = IDL.Variant({
    ok: PanelInfo,
    err: XPUBManipulationError
  });
  const GetCategoryError = IDL.Variant({ CategoryNotFound: IDL.Null });
  const Result_7 = IDL.Variant({ ok: Category, err: GetCategoryError });
  const Result_5 = IDL.Variant({
    ok: IDL.Text,
    err: XPUBManipulationError
  });
  const GetProductError = IDL.Variant({ ProductNotFound: IDL.Null });
  const Result_4 = IDL.Variant({ ok: Product, err: GetProductError });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const Request = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField)
  });
  const StreamingCallbackToken = IDL.Record({
    key: IDL.Text,
    index: IDL.Nat,
    content_encoding: IDL.Text
  });
  const StreamingCallbackResponse = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken),
    body: IDL.Vec(IDL.Nat8)
  });
  const StreamingCallback = IDL.Func(
    [StreamingCallbackToken],
    [StreamingCallbackResponse],
    ["query"]
  );
  const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: StreamingCallbackToken,
      callback: StreamingCallback
    })
  });
  const Response = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16
  });
  const OrderId = IDL.Text;
  const GetParseError = IDL.Variant({
    UserNotAuthenticated: IDL.Null,
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
    ok: Category,
    err: UpdateCategoryError
  });
  const UpdateProductError = IDL.Variant({
    ProductNotFound: IDL.Null,
    UserNotAuthenticated: IDL.Null,
    EmptyTitle: IDL.Null
  });
  const Result = IDL.Variant({ ok: Product, err: UpdateProductError });
  return IDL.Service({
    checkOrderStatus: IDL.Func([IDL.Text], [Result_15], []),
    createCategory: IDL.Func([IDL.Text], [Result_14], []),
    createOrder: IDL.Func([NewOrder], [Result_6], []),
    createProduct: IDL.Func([UserProduct, IDL.Opt(IDL.Vec(IDL.Nat8))], [Result_13], []),
    deleteCategory: IDL.Func([SlugId], [Result_12], []),
    deleteOwnerXPUB: IDL.Func([], [Result_11], []),
    deleteProduct: IDL.Func([SlugId], [Result_10], []),
    generateNextPaymentAddress: IDL.Func([], [Result_9], []),
    getAdminPanelInfo: IDL.Func([], [Result_8], []),
    getCategory: IDL.Func([SlugId], [Result_7], ["query"]),
    getOrder: IDL.Func([IDL.Text], [Result_6], ["query"]),
    getOwnerXPUB: IDL.Func([], [Result_5], []),
    getProduct: IDL.Func([SlugId], [Result_4], ["query"]),
    greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    http_request: IDL.Func([Request], [Response], ["query"]),
    listCategories: IDL.Func([], [IDL.Vec(IDL.Tuple(SlugId, Category))], ["query"]),
    listOrders: IDL.Func([], [IDL.Vec(IDL.Tuple(OrderId, Order))], ["query"]),
    listProducts: IDL.Func([], [IDL.Vec(IDL.Tuple(SlugId, Product))], ["query"]),
    setOwnerXPUB: IDL.Func([IDL.Text], [Result_3], []),
    setUserInputTransactionId: IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    updateCategory: IDL.Func([SlugId, IDL.Text], [Result_1], []),
    updateProduct: IDL.Func([SlugId, UserProduct, IDL.Opt(IDL.Vec(IDL.Nat8))], [Result], [])
  });
};
export const init = ({ IDL }) => {
  return [];
};
