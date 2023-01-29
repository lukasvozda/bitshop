import { actor } from "@/stores";
import { get, writable } from "svelte/store";
import type { Product } from "@/types";

function fetchProducts() {
  const { subscribe, set, update } = writable<[string, Product][]>([]);

  const loadProducts = async () => {
    const actorStore = await get(actor);
    const productList = await actorStore.list_products();
    products.set(productList);
  };

  return {
    subscribe,
    set,
    update,
    loadProducts,
  };
}

export const products = fetchProducts();
