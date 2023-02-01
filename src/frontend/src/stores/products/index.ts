import { actor } from "@/stores";
import { get, writable } from "svelte/store";
import type { Product, Category } from "@/types";

function fetchProducts() {
  const { subscribe, set } = writable<[string, Product][]>([]);

  const loadProducts = async () => {
    const actorStore = await get(actor);
    const productList = await actorStore.list_products();
    products.set(productList);
  };

  return {
    subscribe,
    set,
    loadProducts,
  };
}

export const products = fetchProducts();

function fetchCategories() {
  const { subscribe, set } = writable<[string, Category][]>([]);

  const loadCategories = async () => {
    const categoryStore = await get(actor);
    const categorytList = await categoryStore.list_categories();
    categories.set(categorytList);
  };

  return {
    subscribe,
    set,
    loadCategories,
  };
}

export const categories = fetchCategories();