import List "mo:base/List";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Utils "utils";
import Types "types";

import BitcoinIntegration "./BitcoinIntegration";
import BitcoinApiTypes "bitcoin-api/Types";

import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

import Debug "mo:base/Debug";

import BitcoinTypes "mo:bitcoin/bitcoin/Types";
import Payments "./payments";

actor {

  private stable var nextProduct : Types.ProductId = 1;

  // Type import
  type ProductId = Types.ProductId;
  type SlugId = Types.SlugId;
  type CreateProductError = Types.CreateProductError;
  type GetProductError = Types.GetProductError;
  type UpdateProductError = Types.UpdateProductError;
  type DeleteProductError = Types.DeleteProductError;
  type CreateCategoryError = Types.CreateCategoryError;
  type GetCategoryError = Types.GetCategoryError;
  type UpdateCategoryError = Types.UpdateCategoryError;
  type DeleteCategoryError = Types.DeleteCategoryError;
  type Category = Types.Category;
  type UserProduct = Types.UserProduct;
  type Product = Types.Product;
  type Order = Types.Order;
  type NewOrder = Types.NewOrder;
  type OrderId = Types.OrderId;
  type OrderError = Types.OrderError;
  type OrderStatus = Types.OrderStatus;

  // Bitcoin Types
  type GetUtxosResponse = BitcoinApiTypes.GetUtxosResponse;
  type MillisatoshiPerByte = BitcoinApiTypes.MillisatoshiPerByte;
  type SendRequest = BitcoinApiTypes.SendRequest;
  type Network = BitcoinApiTypes.Network;
  type BitcoinAddress = BitcoinApiTypes.BitcoinAddress;
  type Satoshi = BitcoinApiTypes.Satoshi;

  private var products = Map.HashMap<SlugId, Product>(0, Text.equal, Text.hash);
  private var categories = Map.HashMap<SlugId, Category>(0, Text.equal, Text.hash);
  private stable var stableproducts : [(SlugId, Product)] = [];
  // to preserve products between updates (hashmap is not stable)
  private stable var stablecategories : [(SlugId, Category)] = [];

  private var orders = Map.HashMap<OrderId, Order>(0, Text.equal, Text.hash);
  private var addressToOrder = Map.HashMap<Text, OrderId>(0, Text.equal, Text.hash);
  private stable var stableorders : [(OrderId, Order)] = [];
  private stable var stableaddresstoorder : [(Text, OrderId)] = [];

  // for testing
  private stable var ownerExtendedPublicKeyBase58Check : Text = "tpubDD9S94RYo2MraS7QbRhA64Nr56BzCYN2orJUkk2LE4RkB2npb9SFyiCuofbapC9wNW2hLJqkWwSpGoaE9pZC6fLBQdms5HYS9dsvw79nSWy";
  private stable var currentChildKeyIndex : Nat = 0;
  Debug.print(debug_show ("currentChildKeyIndex: ", currentChildKeyIndex));

  // create a default product, we will remove it later
  let p : Product = {
    id = 0;
    title = "Test product 1";
    category = "t-shirts";
    price = 5.0;
    inventory = 10;
    description = "Test product";
    active = true;
    img = Blob.fromArray([0]);
    slug = "test-product-0";
    time_created = Time.now();
    time_updated = Time.now();
  };

  products.put("test-product-0", p);

  // create a default category, we will remove it later
  let c : Category = {
    name = "T-shirts";
    slug = "t-shirts";
  };

  let g = Source.Source();

  categories.put("t-shirts", c);

  public shared (msg) func createProduct(p : UserProduct) : async Result.Result<(Product), CreateProductError> {

    if (p.title == "") { return #err(#EmptyTitle) };

    let productId = nextProduct;
    nextProduct += 1;
    // increment the counter so we never try to create a product under the same index

    let new_slug = Utils.slugify(p.title) # "-" # Nat.toText(nextProduct); //this should keep slug always unique and we can key hashMap with it

    let product : Product = {
      title = p.title;
      id = productId;
      price = p.price;
      category = p.category;
      inventory = p.inventory;
      description = p.description;
      active = p.active;
      img = Blob.fromArray([0]);
      // Lets deal with product images later
      slug = new_slug;
      time_created = Time.now();
      time_updated = Time.now();
    };

    products.put(new_slug, product);
    return #ok(product);
    // Return an OK result
  };

  public query func getProduct(id : SlugId) : async Result.Result<Product, GetProductError> {
    let product = products.get(id);
    return Result.fromOption(product, #ProductNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func updateProduct(
    id : SlugId,
    p : UserProduct
  ) : async Result.Result<(Product), UpdateProductError> {
    // commented for local development
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    // };

    if (p.title == "") {
      return #err(#EmptyTitle);
    };

    let result = products.get(id);
    switch (result) {
      case null {
        // If the result is null, we return a ProductNotFound error.
        return #err(#ProductNotFound);
      };
      case (?v) {
        // If the post was found, we try to update it.
        let product : Product = {
          title = p.title;
          id = v.id;
          price = p.price;
          category = p.category;
          inventory = p.inventory;
          description = p.description;
          active = p.active;
          img = Blob.fromArray([0]);
          // keep persistent URLS
          slug = v.slug;
          time_created = v.time_created;
          // only update time_updated
          time_updated = Time.now();
        };
        products.put(id, product);
        return #ok(product);
      };
    };
  };

  public shared (msg) func deleteProduct(id : SlugId) : async Result.Result<(), DeleteProductError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    products.delete(id);
    return #ok(());
  };

  public query func listProducts() : async [(SlugId, Product)] {
    return Iter.toArray(products.entries());
  };

  public shared (msg) func createCategory(name : Text) : async Result.Result<(Category), CreateCategoryError> {

    if (name == "") { return #err(#EmptyName) };

    let new_slug = Utils.slugify(name);

    let result = categories.get(new_slug);
    switch (result) {
      case null {
        let category : Category = {
          name = name;
          slug = new_slug;
        };

        categories.put(new_slug, category);
        return #ok(category);
      };
      case (?v) {
        // We want category to exist only once
        return #err(#CategoryAlreadyExists);
      };
    };
  };

  public shared (msg) func updateCategory(
    id : SlugId,
    name : Text
  ) : async Result.Result<(Category), UpdateCategoryError> {
    // commented for local development
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    // };

    if (name == "") {
      return #err(#EmptyName);
    };

    let result = categories.get(id);

    switch (result) {
      case null {
        return #err(#CategoryNotFound);
      };
      case (?v) {
        let category : Category = {
          name = name;
          slug = v.slug; // URL should stay the same
        };
        categories.put(id, category);
        return #ok(category);
      };
    };
  };

  public query func getCategory(id : SlugId) : async Result.Result<Category, GetCategoryError> {
    let category = categories.get(id);
    return Result.fromOption(category, #CategoryNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func deleteCategory(id : SlugId) : async Result.Result<(), DeleteCategoryError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    categories.delete(id);
    return #ok(());
  };

  public query func listCategories() : async [(SlugId, Category)] {
    return Iter.toArray(categories.entries());
  };

  // Preupgrade function will store all posts into stable array before update
  system func preupgrade() {
    stableproducts := Iter.toArray(products.entries());
    stablecategories := Iter.toArray(categories.entries());
    stableorders := Iter.toArray(orders.entries());
    stableaddresstoorder := Iter.toArray(addressToOrder.entries());
  };

  // Postupgrade function will then poppulate HashMap with posts after the update is finished
  system func postupgrade() {
    products := Map.fromIter<SlugId, Product>(
      stableproducts.vals(),
      10,
      Text.equal,
      Text.hash
    );
    categories := Map.fromIter<SlugId, Category>(
      stablecategories.vals(),
      10,
      Text.equal,
      Text.hash
    );
    orders := Map.fromIter<OrderId, Order>(
      stableorders.vals(),
      10,
      Text.equal,
      Text.hash
    );
    addressToOrder := Map.fromIter<Text, OrderId>(
      stableaddresstoorder.vals(),
      10,
      Text.equal,
      Text.hash
    );
  };

  // payments

  public shared (msg) func getOwnerXPUB() : async Text {
    return ownerExtendedPublicKeyBase58Check;
  };

  public shared (msg) func setOwnerXPUB(xpub : Text) : async Result.Result<(), Payments.GetParseError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    switch (Payments.parse(xpub, #Testnet)) {
      case null return #err(#Base58PubKeyWrongFormatError);
      case (?parsedPublicKey) {
        ownerExtendedPublicKeyBase58Check := xpub;
        return #ok(());
      };
    };
  };

  public shared (msg) func deleteOwnerXPUB() : async Result.Result<(), Payments.XPUBManipulationError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    ownerExtendedPublicKeyBase58Check := "";
    currentChildKeyIndex := 0;
    return #ok(());
  };

  public func generateNextPaymentAddress() : async Result.Result<Text, Payments.GetDerivationError> {
    if (ownerExtendedPublicKeyBase58Check == "") {
      return #err(#OwnerExtendedPubKeyNotSet);
    };
    return switch (Payments.parse(ownerExtendedPublicKeyBase58Check, #Testnet)) {
      case null return #err(#Base58PubKeyWrongFormatError);
      case (?parsedPublicKey) {
        switch (parsedPublicKey.derivePath(Payments.getRelativePath(0))) {
          case null return #err(#ChildKeyDerivationError);
          case (?derivedFirstNonHardenedChild) {
            switch (derivedFirstNonHardenedChild.derivePath(Payments.getRelativePath(currentChildKeyIndex))) {
              case null return #err(#ChildKeyDerivationError);
              case (?derived) {
                currentChildKeyIndex := currentChildKeyIndex + 1;
                let address : Text = Payments.getP2PKHAddress(derived.key, #Testnet);
                return #ok(address);
              };
            };
          };
        };
      };
    };
  };

  public func createOrder(order : NewOrder) : async Result.Result<Order, OrderError> {
    return switch (addressToOrder.get(order.paymentAddress)) {
      case (?order) return #err(#PaymentAddressAlreadyUsed);
      case null {
        let orderId : OrderId = UUID.toText(await g.new());

        var newOrder : Order = {
          id = orderId;
          shippingAddress = order.shippingAddress;
          products = order.products;
          totalPrice = order.totalPrice;
          status = #UserConfirmedPayment;
          paymentAddress = order.paymentAddress;
          timeCreated = Time.now();
          userSuppliedTransactionId = "";
          transactionId = "";
        };

        orders.put(orderId, newOrder);
        addressToOrder.put(newOrder.paymentAddress, newOrder.id);

        return #ok(newOrder);
      };
    };
  };

  public query func listOrders() : async [(OrderId, Order)] {
    return Iter.toArray(orders.entries());
  };

  public query func getOrder(orderId : Text) : async Result.Result<Order, OrderError> {
    let order = orders.get(orderId);
    return Result.fromOption(order, #OrderNotFound);
  };

  public func setUserInputTransactionId(address : Text, transactionId : Text) : async Result.Result<OrderId, OrderError> {
    return switch (addressToOrder.get(address)) {
      case null return #err(#OrderNotFound);
      case (?orderId) {
        switch (orders.get(orderId)) {
          case null return #err(#OrderNotFound);
          case (?order) {
            var newOrder : Order = {
              id = order.id;
              shippingAddress = order.shippingAddress;
              products = order.products;
              totalPrice = order.totalPrice;
              status = #TransactionIdSet;
              paymentAddress = order.paymentAddress;
              timeCreated = order.timeCreated;
              transactionId = transactionId;
            };
            orders.put(newOrder.id, newOrder);
            return #ok(order.id);
          };
        };
      };
    };
  };

  public func checkOrderStatus(orderId : Text) : async Result.Result<OrderStatus, OrderError> {
    return switch (orders.get(orderId)) {
      case null return #err(#OrderNotFound);
      case (?order) {
        let transactionBalance : BitcoinTypes.Satoshi = await BitcoinIntegration.get_balance_of_transaction(order.paymentAddress, order.transactionId);
        Debug.print(debug_show (transactionBalance, order.totalPrice));
        if (transactionBalance == order.totalPrice) {
          var newOrder = {
            id = orderId;
            shippingAddress = order.shippingAddress;
            products = order.products;
            totalPrice = order.totalPrice;
            status = #Verified;
            paymentAddress = order.paymentAddress;
            timeCreated = order.timeCreated;
            transactionId = order.transactionId;
          };
          orders.put(orderId, newOrder);
          return #ok(newOrder.status);
        };
        return #ok(order.status);
      };
    };
  };

  public shared query ({ caller }) func greet(name : Text) : async Text {
    return "Hello, " # name # "! " # "Your PrincipalId is: " # Principal.toText(caller);
  };

};
