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
    products.set(productList);
  };

  const createProduct = async (product: UserProduct, img: Blob | null) => {
    return get(actor)
      .createProduct(product, img)
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
        alerts.addAlert("Unable to create product.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      });
  };

  const updateProduct = async (slug: string, product: UserProduct, img: Blob | null) => {
    return get(actor)
      .updateProduct(slug, product, img)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          products.loadProducts();
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
        alerts.addAlert("Unable to update product.", Status.ERROR);
        console.log(err);
        alertVisibility.showAlert();
        return null;
      });
  };

  const deleteProduct = async (slug: string) => {
    return get(actor)
      .deleteProduct(slug)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          alerts.addAlert("Product succesfully deleted.", Status.SUCCESS);
          alertVisibility.showAlert();
          products.loadProducts();
          return true;
        } else {
          alerts.addAlert(
            "Unable to delete product: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return false;
        }
      })
      .catch((err: any): any => {
        alerts.addAlert("Unable to delete product.", Status.ERROR);
        alertVisibility.showAlert();
        return false;
      });
  };

  return {
    subscribe,
    set,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct
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

  const createCategory = async (name: string) => {
    return get(actor)
      .createCategory(name)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          categories.loadCategories();
          alerts.addAlert("Category succesfully created.", Status.SUCCESS);
          alertVisibility.showAlert();
          return response.ok;
        } else {
          alerts.addAlert(
            "Unable to create category: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return null;
        }
      })
      .catch((err: any): any => {
        alerts.addAlert("Unable to create category.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      });
  };

  const updateCategory = async (slug: string, name: string) => {
    return get(actor)
      .updateCategory(slug, name)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          categories.loadCategories();
          alerts.addAlert("Category succesfully updated.", Status.SUCCESS);
          alertVisibility.showAlert();
          return response.ok;
        } else {
          alerts.addAlert(
            "Unable to update category: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return null;
        }
      })
      .catch((err: any): any => {
        alerts.addAlert("Unable to update category.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      });
  };

  const deleteCategory = async (slug: string) => {
    return get(actor)
      .deleteCategory(slug)
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          categories.loadCategories();
          alerts.addAlert("Category succesfully deleted.", Status.SUCCESS);
          alertVisibility.showAlert();
          return true;
        } else {
          alerts.addAlert(
            "Unable to delete category: " + Object.keys(response.err)[0],
            Status.ERROR
          );
          alertVisibility.showAlert();
          return false;
        }
      })
      .catch((err: any): any => {
        alerts.addAlert("Unable to delete category.", Status.ERROR);
        alertVisibility.showAlert();
        return false;
      });
  };

  return {
    subscribe,
    set,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}

export const categories = fetchCategories();
