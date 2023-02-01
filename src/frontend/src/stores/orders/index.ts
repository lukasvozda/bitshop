import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts } from "@/stores/alerts";
import { paymentAddress, productsInCart, shippingAddress, totalPrice } from "@/stores/cart";
import type { ApiResponse } from "@/types";
import { derived, get } from "svelte/store";

export const cartOrder = derived(
  [shippingAddress, productsInCart, totalPrice, paymentAddress],
  ([$shippingAddress, $productsInCart, $totalPrice, $paymentAddress]) => {
    return {
      shippingAddress: {
        //...$shippingAddress
        mail: "test@test.cz",
        firstName: "test",
        lastName: "test",
        street: "test",
        postCode: "test123",
        country: "Test",
        city: "TestTest",
        county: ""
      },
      //products: [...$productsInCart],
      products: [{ id: 1, quantity: 2 }],
      totalPrice: parseFloat($totalPrice),
      paymentAddress: $paymentAddress
    };
  }
);

export const createOrder = async () => {
  return get(actor)
    .createOrder(get(cartOrder))
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        return response.ok;
      } else {
        alerts.addAlert(response.err, Status.ERROR);
        return null;
      }
    })
    .catch((err) => {
      alerts.addAlert(err, Status.ERROR);
      return null;
    });
};

export const validateOrderTransactionFinished = async (orderId: string) => {
  return get(actor)
    .checkOrderStatus(parseInt(orderId))
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        return response.ok;
      } else {
        alerts.addAlert(response.err, Status.ERROR);
        return null;
      }
    })
    .catch((err) => {
      alerts.addAlert(err, Status.ERROR);
      return null;
    });
};
