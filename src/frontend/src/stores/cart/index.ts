import type { CartProduct, Product } from "@/types";
import { derived, writable } from "svelte/store";

export enum Steps {
  PRODUCTS = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  CONFIRMATION = 3
}

export const currentStep = writable(Steps.PRODUCTS);

function fetchProducts() {
  const { subscribe, update } = writable([]);

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

  const clear = () => update(() => []);

  return {
    subscribe,
    addProduct,
    removeProduct,
    removeProductCompletely,
    clear
  };
}

export const productsInCart = fetchProducts();

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
      shippingLocation: $shippingLocation,
      shippingPerson: $shippingPerson
    };
  }
);

export const totalPrice = derived(productsInCart, ($products) => {
  const result = $products.reduce(
    (acc, item: CartProduct) => acc + item.product.price * item.quantity,
    0
  );
  return result;
});

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

// export const time = readable(new Date(), function start(set) {
//     const interval = setInterval(() => {
//         set(new Date());
//     }, 1000);
//
//     return function stop() {
//         clearInterval(interval);
//     };
// });
