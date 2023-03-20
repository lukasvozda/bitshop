import Time "mo:base/Time";
import BitcoinApiTypes "bitcoin-api/Types";

module {

  public type ProductId = Nat;
  public type SlugId = Text;

  public type CreateProductError = {
    #UserNotAuthenticated;
    #EmptyTitle;
  };

  public type GetProductError = {
    #ProductNotFound;
  };

  public type UpdateProductError = {
    #UserNotAuthenticated;
    #EmptyTitle;
    #ProductNotFound;
  };

  public type DeleteProductError = {
    #UserNotAuthenticated;
  };

  public type CreateCategoryError = {
    #UserNotAuthenticated;
    #EmptyName;
    #CategoryAlreadyExists;
    // TODO add verification to category_create function
  };

  public type GetCategoryError = {
    #CategoryNotFound;
  };

  public type UpdateCategoryError = {
    #UserNotAuthenticated;
    #EmptyName;
    #CategoryNotFound;
  };

  public type DeleteCategoryError = {
    #UserNotAuthenticated;
  };

  public type OrderError = {
    #MissingData;
    #PaymentAddressAlreadyUsed;
    #UnableToCreate;
    #OrderNotFound;
    #UnableToUpdate;
  };

  public type Category = {
    name : Text;
    slug : Text;
  };

  // User input data
  public type UserProduct = {
    title : Text;
    price : Float;
    inventory : Nat8;
    description : Text;
    category : SlugId;
    active : Bool;
  };

  // Backend data
  public type Product = UserProduct and {
    id : ProductId;
    slug : Text;
    img : ImgId;
    time_created : Time.Time;
    time_updated : Time.Time;
  };

  public type ShippingAddress = {
    mail : Text;
    firstName : Text;
    lastName : Text;
    street : Text;
    city : Text;
    postCode : Text;
    country : Text;
    county : Text;
  };

  public type OrderId = Text;
  public type OrderProduct = {
    id : ProductId;
    quantity : Nat8;
  };

  public type OrderStatus = {
    #UserConfirmedPayment;
    #TransactionIdSet;
    #Verified;
  };

  public type NewOrder = {
    shippingAddress : ShippingAddress;
    products : [OrderProduct];
    totalPrice : BitcoinApiTypes.Satoshi;
    paymentAddress : Text;
  };

  public type Order = NewOrder and {
    id : OrderId;
    status : OrderStatus;
    timeCreated : Time.Time;
    transactionId : Text;
  };

  public type PanelInfo = {
    ordersCount : Nat;
    totalRevenue : BitcoinApiTypes.Satoshi;
    accountBalance : BitcoinApiTypes.Satoshi;
  };

  public type ImgId = Text;

  public type HeaderField = (Text, Text);

  public type StreamingStrategy = {
    #Callback : {
      callback : StreamingCallback;
      token : StreamingCallbackToken;
    };
  };

  public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

  public type StreamingCallbackToken = {
    content_encoding : Text;
    index : Nat;
    key : Text;
  };

  public type StreamingCallbackResponse = {
    body : Blob;
    token : ?StreamingCallbackToken;
  };

  public type Request = {
    body : Blob;
    headers : [HeaderField];
    method : Text;
    url : Text;
  };

  public type Response = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?StreamingStrategy;
    status_code : Nat16;
  };

};
