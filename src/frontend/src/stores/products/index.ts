import { actor } from "@/stores";
import { get, writable } from "svelte/store";

function fetchProducts() {
  const { subscribe, set, update } = writable([]);

  const loadProducts = async () => {
    const actorStore = await get(actor);
    const productList = await actorStore.list_products();
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
