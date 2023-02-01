import { actor } from "@/stores";
import { products, categories } from "@/stores/products";

actor.init();
products.loadProducts();
categories.loadCategories();