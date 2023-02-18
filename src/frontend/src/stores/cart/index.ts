import { browser } from "$app/environment";
import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts } from "@/stores/alerts";
import type { ApiResponse, CartProduct, Product } from "@/types";
import { derived, get, writable } from "svelte/store";

export enum Steps {
  PRODUCTS = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  TRANSACTION_SET = 3
}

export const currentStep = writable(Steps.PRODUCTS);

function fetchProducts() {
  const { subscribe, update, set } = writable<CartProduct[]>(
    browser && window.localStorage.cart ? JSON.parse(window.localStorage.cart).products : []
  );

  const findProductIndex = (products: CartProduct[], productId: number) =>
    products.findIndex((cartProduct) => cartProduct.product.id === productId);

  const addProduct = (newProduct: Product) =>
    update((products: CartProduct[]) => {
      const cartProductIndex = findProductIndex(products, newProduct.id);
      if (cartProductIndex > -1) {
        products[cartProductIndex].quantity += 1;
      } else {
        products.push({ product: newProduct, quantity: 1 });
      }
      return products;
    });

  const removeProduct = (productId: number) =>
    update((products: CartProduct[]) => {
      const cartProductIndex = findProductIndex(products, productId);
      if (cartProductIndex > -1) {
        if (products[cartProductIndex].quantity > 1) {
          products[cartProductIndex].quantity -= 1;
        } else {
          products.splice(cartProductIndex, 1);
        }
      }
      return products;
    });

  const removeProductCompletely = (productId: number) =>
    update((products: CartProduct[]) => {
      const cartProductIndex = findProductIndex(products, productId);
      if (cartProductIndex > -1) {
        products.splice(cartProductIndex, 1);
      }
      return products;
    });

  const clear = () => set([]);

  return {
    subscribe,
    addProduct,
    removeProduct,
    removeProductCompletely,
    clear
  };
}

export const productsInCart = fetchProducts();
productsInCart.subscribe((products) => {
  if (browser) {
    window.localStorage.cart = JSON.stringify({ products });
  }
});

export const mail = writable(null);
export const firstName = writable(null);
export const lastName = writable(null);
export const street = writable(null);
export const city = writable(null);
export const postCode = writable(null);
export const country = writable(null);
export const county = writable(null);

export const shippingPerson = derived(
  [mail, firstName, lastName, street, postCode],
  ([$mail, $firstName, $lastName, $street, $postCode]) => {
    return {
      mail: $mail,
      firstName: $firstName,
      lastName: $lastName,
      street: $street,
      postCode: $postCode
    };
  }
);

export const shippingLocation = derived([country, county, city], ([$country, $county, $city]) => {
  return {
    country: $country,
    county: $county,
    city: $city
  };
});

export const shippingAddress = derived(
  [shippingLocation, shippingPerson],
  ([$shippingLocation, $shippingPerson]) => {
    return {
      ...$shippingLocation,
      ...$shippingPerson
    };
  }
);

export const totalPrice = derived(productsInCart, ($products) => {
  const result = $products.reduce(
    (acc, item: CartProduct) => acc + item.product.price * item.quantity,
    0
  );
  return result.toFixed(8);
});

export const transactionId = writable(null);
export const orderId = writable(null);

const fetchPaymentAddress = () => {
  const { subscribe, set } = writable(null);

  const clear = (): any => {
    set(null);
  };

  const getNewPaymentAddress = async () => {
    return get(actor)
      .generateNextPaymentAddress()
      .then((response: ApiResponse) => {
        if ("ok" in response) {
          set(response.ok);
          return response.ok;
        } else {
          alerts.addAlert(response.err, Status.ERROR);
          return null;
        }
      })
      .catch((err: any): any => {
        alerts.addAlert(err, Status.ERROR);
        return null;
      });
  };
  return {
    subscribe,
    clear,
    set,
    getNewPaymentAddress
  };
};

export const paymentAddress = fetchPaymentAddress();

export const validateShippingDetailsStep = derived(
  [shippingPerson, shippingLocation],
  ([$shippingPerson, $shippingLocation]) => {
    for (const field in $shippingPerson) {
      const fieldValue = $shippingPerson[field as keyof typeof $shippingPerson];
      if (fieldValue == null || fieldValue["invalid"] || !fieldValue["dirty"]) {
        return false;
      }
    }
    if (
      $shippingLocation.country == null ||
      $shippingLocation.country["invalid"] ||
      !$shippingLocation.country["dirty"]
    ) {
      return false;
    }
    return !(
      $shippingLocation.city == null ||
      $shippingLocation.city["invalid"] ||
      !$shippingLocation.city["dirty"]
    );
  }
);

export const validateProductsStep = derived(
  productsInCart,
  ($productsInCart) => $productsInCart.length > 0
);

export const clearCart = () => {
  currentStep.set(0);
  mail.set(null);
  firstName.set(null);
  lastName.set(null);
  street.set(null);
  city.set(null);
  postCode.set(null);
  country.set(null);
  county.set(null);
  paymentAddress.clear();
  productsInCart.clear();
};
