import List "mo:base/List";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

actor {
	public func greet(name : Text) : async Text {
		return "Hello, " # name # "!";
	};

	type ProductId = Nat;
	//type OrderId = Nat;
	private stable var next : ProductId = 1;
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

	type Product = {
		title : Text;
		id : ProductId;
		price : Nat;
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
	private stable var stableproducts : [(ProductId, Product)] = []; // to preserve products between updates (hashmap is not stable)
	//private var orders = Map.HashMap<OrderId, Order>(0, eq, Hash.hash);

	public shared (msg) func create_product(p : { title : Text; price : Nat }) : async Result.Result<(), CreateProductError> {

		let productId = next;
		next += 1;
		// increment the counter so we never try to create a product under the same index

		let product : Product = {
			//time_created = Time.now();
			//time_updated = Time.now();
			title = p.title;
			id = productId;
			price = p.price;
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

	public shared (msg) func update_product(id : ProductId, product : { title : Text; price : Nat }) : async Result.Result<(), UpdateProductError> {
		// commented for local development
		// if(Principal.isAnonymous(msg.caller)){
		//     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
		// };

		if (product.title == "") {
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
				let edited_product : Product = {
					id = id;
					title = product.title;
					price = product.price;
				};
				products.put(id, edited_product);
			};
		};
		return #ok(());
		// If all goes fine, return an OK result.
	};

	public shared (msg) func delete(id : ProductId) : async Result.Result<(), DeleteProductError> {
		// if(Principal.isAnonymous(msg.caller)){
		//     return #err(#UserNotAuthenticated);
		// };
		products.delete(id);
		return #ok(());
	};

	public query func list_products() : async [(ProductId, Product)] {
		return Iter.toArray(products.entries());
	};

	// Preupgrade function will store all posts into stable array before update
	system func preupgrade() {
		stableproducts := Iter.toArray(products.entries());
	};

	// Postupgrade function will then poppulate HashMap with posts after the update is finished
	system func postupgrade() {
		products := Map.fromIter<ProductId, Product>(
			stableproducts.vals(),
			10,
			eq,
			Hash.hash
		);
	};
};
