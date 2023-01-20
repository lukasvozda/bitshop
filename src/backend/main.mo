import List "mo:base/List";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

//import Bip32 "motoko-bitcoin/src/Bip32";
import Debug "mo:base/Debug";
//import Base58Check "motoko-bitcoin/src/Base58Check";
//import SHA256 "motoko-bitcoin/motoko-sha/src/SHA256";

import Text "mo:base/Text";
import Nat "mo:base/Nat";

import Types "motoko-bitcoin/src/bitcoin/Types";
import Payments "./Payments";

actor {
	public func greet(name : Text) : async Text {
		return "Hello, " # name # "!";
	};

	type ProductId = Nat;
	type CategoryId = Nat;
	//type OrderId = Nat;
	private stable var next_product : ProductId = 1;
	private stable var next_category : CategoryId = 1;
	//private stable var nextOrderId : OrderId = 1;

	// TODO add more possible errors
	type CreateProductError = {
		#UserNotAuthenticated;
		#EmptyTitle;
	};

	type GetProductError = {
		#ProductNotFound;
	};

	type UpdateProductError = {
		#UserNotAuthenticated;
		#EmptyTitle;
		#ProductNotFound;
	};

	type DeleteProductError = {
		#UserNotAuthenticated;
	};

	type CreateCategoryError = {
		#UserNotAuthenticated;
		#EmptyName;
		#CategoryAlreadyExists; // TODO add verification to category_create function
	};

	type GetCategoryError = {
		#CategoryNotFound;
	};

	type UpdateCategoryError = {
		#UserNotAuthenticated;
		#EmptyName;
		#CategoryNotFound;
	};

	type DeleteCategoryError = {
		#UserNotAuthenticated;
	};

	type Category = {
		name : Text;
		id : CategoryId;
		slug : Text;
	};

	type Product = {
		title : Text;
		id : ProductId;
		price : Nat;
		category : CategoryId;
		//add these parameters later
		//status : { #active; #paused }; TODO
		//slug : Text; TODO
		//img : Text; TODO
		//stock : Nat8; TODO
		//description : Text; TODO
		//time_created : Time; TODO
		//time_updated : Time; TODO
	};

	let eq : (Nat, Nat) -> Bool = func(x, y) { x == y };
	private var products = Map.HashMap<ProductId, Product>(0, eq, Hash.hash);
	private var categories = Map.HashMap<CategoryId, Category>(0, eq, Hash.hash);
	private stable var stableproducts : [(ProductId, Product)] = [];
	// to preserve products between updates (hashmap is not stable)
	private stable var stablecategories : [(CategoryId, Category)] = [];
	//private var orders = Map.HashMap<OrderId, Order>(0, eq, Hash.hash);

	//    private stable var childPubIndex : Nat = 0;

	private stable var ownerExtendedPublicKeyBase58Check : Text = "";
	private stable var currentChildKeyIndex : Nat = 0;

	// create a default product, we will remove it later
	let p : Product = {
		id = 0;
		title = "Test product 1";
		category = 0;
		price = 5;
	};

	products.put(0, p);

	// create a default category, we will remove it later
	let c : Category = {
		id = 0;
		name = "T-shirts";
		slug = "t-shirts";
	};

	categories.put(0, c);

	public shared (msg) func create_product(p : { title : Text; price : Nat; category : CategoryId }) : async Result.Result<(), CreateProductError> {

		if (p.title == "") { return #err(#EmptyTitle) };

		let productId = next_product;
		next_product += 1;
		// increment the counter so we never try to create a product under the same index

		let product : Product = {
			title = p.title;
			id = productId;
			price = p.price;
			category = p.category;
			//add missing parameters later
		};

		products.put(productId, product);
		return #ok(());
		// Return an OK result
	};

	public query func get_product(id : ProductId) : async Result.Result<Product, GetProductError> {
		let product = products.get(id);
		return Result.fromOption(product, #ProductNotFound);
		// If the post is not found, this will return an error as result.
	};

	public shared (msg) func update_product(
		id : ProductId,
		p : { title : Text; price : Nat; category : CategoryId }
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
					id = id;
					title = p.title;
					price = p.price;
					category = p.category;
				};
				products.put(id, product);
			};
		};
		return #ok(());
		// If all goes fine, return an OK result.
	};

	public shared (msg) func delete_product(id : ProductId) : async Result.Result<(), DeleteProductError> {
		// if(Principal.isAnonymous(msg.caller)){
		//     return #err(#UserNotAuthenticated);
		// };
		products.delete(id);
		return #ok(());
	};

	public query func list_products() : async [(ProductId, Product)] {
		return Iter.toArray(products.entries());
	};

	public shared (msg) func create_category(c : { name : Text; slug : Text }) : async Result.Result<(), CreateCategoryError> {

		if (c.name == "") { return #err(#EmptyName) };

		let categoryId = next_category;
		next_category += 1;

		let category : Category = {
			id = categoryId;
			name = c.name;
			slug = c.slug; // TODO decide whether slug will be created in the backend or in the frontend
		};

		categories.put(categoryId, category);
		return #ok(());
	};

	public shared (msg) func update_category(
		id : CategoryId,
		c : { name : Text; slug : Text }
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
					id = id;
					name = c.name;
					slug = c.slug;
				};
				categories.put(id, category);
			};
		};
		return #ok(());
	};

	public query func get_category(id : CategoryId) : async Result.Result<Category, GetCategoryError> {
		let category = categories.get(id);
		return Result.fromOption(category, #CategoryNotFound);
		// If the post is not found, this will return an error as result.
	};

	public shared (msg) func delete_category(id : CategoryId) : async Result.Result<(), DeleteCategoryError> {
		// if(Principal.isAnonymous(msg.caller)){
		//     return #err(#UserNotAuthenticated);
		// };
		categories.delete(id);
		return #ok(());
	};

	public query func list_categories() : async [(CategoryId, Category)] {
		return Iter.toArray(categories.entries());
	};

	// Preupgrade function will store all posts into stable array before update
	system func preupgrade() {
		stableproducts := Iter.toArray(products.entries());
		stablecategories := Iter.toArray(categories.entries());
	};

	// Postupgrade function will then poppulate HashMap with posts after the update is finished
	system func postupgrade() {
		products := Map.fromIter<ProductId, Product>(
			stableproducts.vals(),
			10,
			eq,
			Hash.hash
		);
		categories := Map.fromIter<CategoryId, Category>(
			stablecategories.vals(),
			10,
			eq,
			Hash.hash
		);
	};

    // payments

	public query func getOwnerXPUB() : async Text {
		return ownerExtendedPublicKeyBase58Check;
	};

	public func setOwnerXPUB(xpub : Text) : async Result.Result<(), Payments.GetParseError> {
		switch (Payments.parse(xpub, #Mainnet)) {
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
		let path : Text = Payments.getRelativePath(currentChildKeyIndex);
        currentChildKeyIndex := currentChildKeyIndex + 1;
		return switch (Payments.parse(ownerExtendedPublicKeyBase58Check, #Mainnet)) {
			case null return #err(#Base58PubKeyWrongFormatError);
			case (?parsedPublicKey) {
				return switch (parsedPublicKey.derivePath(path)) {
					case null return #err(#ChildKeyDerivationError);
					case (?derived) {
						let address : Text = Payments.getP2PKHAddress(derived.key);
						return #ok(address);
					};
				};
			};
		};
	};
};
