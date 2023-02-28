import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts, alertVisibility } from "@/stores/alerts";
import type { ApiResponse, Category, Product, UserProduct } from "@/types";
import { get, writable } from "svelte/store";

function fetchProducts() {
  const { subscribe, set } = writable<[string, Product][]>([]);

  const loadProducts = async () => {
    const actorStore = await get(actor);
    let productList = await actorStore.listProducts();

    // TODO remove once we have actual image functionality
    productList = productList.map((product: any) => [
      product[0],
      {
        ...product[1],
        img: "/product.jpg"
        //description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat malesuada malesuada. Phasellus in ligula laoreet, rhoncus dui vel, hendrerit leo. Sed aliquet blandit justo suscipit blandit."
      }
    ]);

    products.set(productList);
  };

  const createProduct = async (product: UserProduct) => {
    return get(actor)
      .createProduct(product)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          products.loadProducts();
          alerts.addAlert("Product succesfully created.", Status.SUCCESS);
          alertVisibility.showAlert();
          return response.ok;
        } else {
          alerts.addAlert(
            "Unable to create product: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return null;
        }
      })
      .catch((err: any): any => {
        console.log(Status.ERROR);
        alerts.addAlert("Unable to create product.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      });
  };

  const updateProduct = async (slug: string, product: UserProduct) => {
    return get(actor)
      .updateProduct(slug, product)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          //products.loadProducts();
          alerts.addAlert("Product succesfully updated.", Status.SUCCESS);
          alertVisibility.showAlert();
          return response.ok;
        } else {
          alerts.addAlert(
            "Unable to update product: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return null;
        }
      })
      .catch((err: any): any => {
        console.log(Status.ERROR);
        alerts.addAlert("Unable to update product.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      });
  };

  return {
    subscribe,
    set,
    loadProducts,
    createProduct,
    updateProduct
  };
}

export const products = fetchProducts();

function fetchCategories() {
  const { subscribe, set } = writable<[string, Category][]>([]);

  const loadCategories = async () => {
    const categoryStore = await get(actor);
    const categorytList = await categoryStore.listCategories();
    categories.set(categorytList);
  };

  return {
    subscribe,
    set,
    loadCategories
  };
}

export const categories = fetchCategories();
