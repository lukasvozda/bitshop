import { actor } from "@/stores";
import type { Category, Product } from "@/types";
import { get, writable } from "svelte/store";

function fetchProducts() {
  const { subscribe, set } = writable<[string, Product][]>([]);

  const loadProducts = async () => {
    const actorStore = await get(actor);
    let productList = await actorStore.list_products();

    // TODO remove once we have actual image functionality
    productList = productList.map((product: any) => [
      product[0],
      {
        ...product[1],
        img: "/product.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat malesuada malesuada. Phasellus in ligula laoreet, rhoncus dui vel, hendrerit leo. Sed aliquet blandit justo suscipit blandit."
      }
    ]);

    products.set(productList);
  };

  return {
    subscribe,
    set,
    loadProducts
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
    loadCategories
  };
}

export const categories = fetchCategories();
