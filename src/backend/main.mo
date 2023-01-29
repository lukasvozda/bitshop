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

//import Bip32 "motoko-bitcoin/src/Bip32";
import Debug "mo:base/Debug";
//import Base58Check "motoko-bitcoin/src/Base58Check";
//import SHA256 "motoko-bitcoin/motoko-sha/src/SHA256";

import BitcoinTypes "motoko-bitcoin/src/bitcoin/Types";
import Payments "./payments";

actor {

  private stable var next_product : ProductId = 1;
  //private stable var nextOrderId : OrderId = 1;

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

  private var products = Map.HashMap<SlugId, Product>(0, Text.equal, Text.hash);
  private var categories = Map.HashMap<SlugId, Category>(0, Text.equal, Text.hash);
  private stable var stableproducts : [(SlugId, Product)] = [];
  // to preserve products between updates (hashmap is not stable)
  private stable var stablecategories : [(SlugId, Category)] = [];
  //private var orders = Map.HashMap<OrderId, Order>(0, eq, Hash.hash);

  // for testing
  private stable var ownerExtendedPublicKeyBase58Check : Text = "tpubDD9S94RYo2MraS7QbRhA64Nr56BzCYN2orJUkk2LE4RkB2npb9SFyiCuofbapC9wNW2hLJqkWwSpGoaE9pZC6fLBQdms5HYS9dsvw79nSWy";
  private stable var currentChildKeyIndex : Nat = 0;

  // create a default product, we will remove it later
  let p : Product = {
    id = 0;
    title = "Test product 1";
    category = "t-shirts";
    price = 5.0;
    inventory = 10;
    description = "Test product";
    status = #active;
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

  categories.put("t-shirts", c);

  public shared (msg) func create_product(p : UserProduct) : async Result.Result<(), CreateProductError> {

    if (p.title == "") { return #err(#EmptyTitle) };

    let productId = next_product;
    next_product += 1;
    // increment the counter so we never try to create a product under the same index

    let new_slug = Utils.slugify(p.title) # "-" # Nat.toText(next_product); //this should keep slug always unique and we can key hashMap with it

    let product : Product = {
      title = p.title;
      id = productId;
      price = p.price;
      category = p.category;
      inventory = p.inventory;
      description = p.description;
      status = p.status;
      img = Blob.fromArray([0]);
      // Lets deal with product images later
      slug = new_slug;
      time_created = Time.now();
      time_updated = Time.now();
    };

    products.put(new_slug, product);
    return #ok(());
    // Return an OK result
  };

  public query func get_product(id : SlugId) : async Result.Result<Product, GetProductError> {
    let product = products.get(id);
    return Result.fromOption(product, #ProductNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func update_product(
    id : SlugId,
    p : UserProduct
  ) : async Result.Result<(), UpdateProductError> {
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
          status = p.status;
          img = Blob.fromArray([0]);
          // keep persistent URLS
          slug = v.slug;
          time_created = v.time_created;
          // only update time_updated
          time_updated = Time.now();
        };
        products.put(id, product);
      };
    };
    return #ok(());
    // If all goes fine, return an OK result.
  };

  public shared (msg) func delete_product(id : SlugId) : async Result.Result<(), DeleteProductError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    products.delete(id);
    return #ok(());
  };

  public query func list_products() : async [(SlugId, Product)] {
    return Iter.toArray(products.entries());
  };

  public shared (msg) func create_category(name : Text) : async Result.Result<(), CreateCategoryError> {

    if (name == "") { return #err(#EmptyName) };

    let new_slug = Utils.slugify(name);

    let result = categories.get(new_slug);
    switch (result) {
      case null {
        let category : Category = {
          name = c.name;
          slug = new_slug;
        };

        categories.put(new_slug, category);
        return #ok(());
      };
      case (?v) {
        // We want category to exist only once
        return #err(#CategoryAlreadyExists);
      };
    };
    return #ok(());
  };

  public shared (msg) func update_category(
    id : SlugId,
    name : Text
  ) : async Result.Result<(), UpdateCategoryError> {
    // commented for local development
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    // };

    if (c.name == "") {
      return #err(#EmptyName);
    };

    let result = categories.get(id);
    switch (result) {
      case null {
        return #err(#CategoryNotFound);
      };
      case (?v) {
        let category : Category = {
          name = c.name;
          slug = v.slug; // URL should stay the same
        };
        categories.put(id, category);
      };
    };
    return #ok(());
  };

  public query func get_category(id : SlugId) : async Result.Result<Category, GetCategoryError> {
    let category = categories.get(id);
    return Result.fromOption(category, #CategoryNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func delete_category(id : SlugId) : async Result.Result<(), DeleteCategoryError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    categories.delete(id);
    return #ok(());
  };

  public query func list_categories() : async [(SlugId, Category)] {
    return Iter.toArray(categories.entries());
  };

  // Preupgrade function will store all posts into stable array before update
  system func preupgrade() {
    stableproducts := Iter.toArray(products.entries());
    stablecategories := Iter.toArray(categories.entries());
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
  };

  // payments

  public query func getOwnerXPUB() : async Text {
    return ownerExtendedPublicKeyBase58Check;
  };

  public func setOwnerXPUB(xpub : Text) : async Result.Result<(), Payments.GetParseError> {
    switch (Payments.parse(xpub, #Testnet)) {
      case null return #err(#Base58PubKeyWrongFormatError);
      case (?parsedPublicKey) {
        ownerExtendedPublicKeyBase58Check := xpub;
        return #ok(());
      };
    };
  };

  public func deleteOwnerXPUB() {
    ownerExtendedPublicKeyBase58Check := "";
    currentChildKeyIndex := 0;
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

  public type NoOpError = {
    #NoOpError;
  };

  public func noOp() : async Result.Result<(), NoOpError> {
    return #ok(());
  };

  private var orders = Map.HashMap<OrderId, Order>(0, Text.equal, Text.hash);
  private var addressToOrder = Map.HashMap<Text, Order>(0, Text.equal, Text.hash);

  public func createOrder(order : Order) : async Result.Result<(), OrderError> {
    if (p.title == "") { return #err(#EmptyTitle) };

    let productId = next_product;
    next_product += 1;
    // increment the counter so we never try to create a product under the same index

    let new_slug = Utils.slugify(p.title) # "-" # Nat.toText(next_product); //this should keep slug always unique and we can key hashMap with it

    let product : Product = {
      title = p.title;
      id = productId;
      price = p.price;
      category = p.category;
      inventory = p.inventory;
      description = p.description;
      status = p.status;
      img = Blob.fromArray([0]);
      // Lets deal with product images later
      slug = new_slug;
      time_created = Time.now();
      time_updated = Time.now();
    };

    products.put(new_slug, product);
    return #ok(());
  }

};
