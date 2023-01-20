import { writable, readable, derived } from 'svelte/store';
import type { Product } from "../../types";

export const products = writable([]);

export const email = writable(null);
export const firstName = writable(null);
export const lastName = writable(null);
export const street = writable(null);
export const city = writable(null);
export const postCode = writable(null);
export const country = writable(null);
export const county = writable(null);

export const paymentAddress = writable(null);

export const shippingAddress = derived(
    [email, firstName, lastName, street, city, postCode, country, county],
    ([$email, $firstName, $lastName, $street, $city, $postCode, $country, $county]) => {
        return {
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            street: $street,
            city: $city,
            postCode: $postCode,
            country: $country,
            county: $county,
        }
    }
)

export const totalPrice = derived(
    products,
    ($products) =>
        $products.reduce((acc, product : Product) => acc + product.price, 0)
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

