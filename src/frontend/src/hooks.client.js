import { actor } from "@/stores";
import { products } from "@/stores/products";

actor.init();
products.loadProducts();
