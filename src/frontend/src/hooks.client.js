import { actor } from "@/stores";
import { categories, products } from "@/stores/products";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

actor.init();
products.loadProducts();
categories.loadCategories();
