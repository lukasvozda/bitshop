import type { Product } from "@/types";
import { derived, writable } from "svelte/store";

export enum Steps {
  PRODUCTS = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  CONFIRMATION = 3
}

export const currentStep = writable(Steps.PRODUCTS);

export const products = writable([]);

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

export const totalPrice = derived(products, ($products) =>
  $products.reduce((acc, product: Product) => acc + product.price, 0)
);

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

// export const time = readable(new Date(), function start(set) {
//     const interval = setInterval(() => {
//         set(new Date());
//     }, 1000);
//
//     return function stop() {
//         clearInterval(interval);
//     };
// });
