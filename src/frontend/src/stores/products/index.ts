import { actor } from "@/stores";
import type { Product } from "@/types";
import { get, writable } from "svelte/store";

function fetchProducts() {
  const { subscribe, set, update } = writable<[string, Product][]>([]);

  const loadProducts = async () => {
    const productList = await get(actor).list_products();
    products.set(productList);
  };

  return {
    subscribe,
    set,
    update,
    loadProducts
  };
}

export const products = fetchProducts();
