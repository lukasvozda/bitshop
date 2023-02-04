import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts, alertVisibility } from "@/stores/alerts";
import { paymentAddress, productsInCart, shippingAddress, totalPrice } from "@/stores/cart";
import type { ApiResponse, Order } from "@/types";
import { derived, get } from "svelte/store";

export const cartOrder = derived(
  [shippingAddress, productsInCart, totalPrice, paymentAddress],
  ([$shippingAddress, $productsInCart, $totalPrice, $paymentAddress]) => {
    return {
      shippingAddress: {
        ...$shippingAddress
      },
      products: [...$productsInCart],
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
        alertVisibility.showAlert();
        return null;
      }
    })
    .catch((err: any): any => {
      alerts.addAlert(err, Status.ERROR);
      alertVisibility.showAlert();
      return null;
    });
};

export const checkOrderVerified = async (orderId: string) => {
  return get(actor)
    .checkOrderStatus(parseInt(orderId))
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        return response.ok;
      } else {
        alerts.addAlert(`Unable to verify order with ID ${orderId}.`, Status.ERROR);
        alertVisibility.showAlert();
        return null;
      }
    })
    .catch((): any => {
      alerts.addAlert(`Unable to verify order with ID ${orderId}.`, Status.ERROR);
      alertVisibility.showAlert();
      return null;
    });
};

export const listOrders = async () => {
  return get(actor)
    .listOrders()
    .then((response: [string, Order][]) => {
      return response;
    })
    .catch((err: any): any => {
      alerts.addAlert(err, Status.ERROR);
      alertVisibility.showAlert();
      return null;
    });
};

export const getOrder = async (orderId: number) => {
  return get(actor)
    .getOrder(orderId)
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        return response.ok;
      } else {
        alerts.addAlert(response.err, Status.ERROR);
        alertVisibility.showAlert();
        return null;
      }
    })
    .catch((err: any): any => {
      alerts.addAlert(err, Status.ERROR);
      alertVisibility.showAlert();
      return null;
    });
};

export const setUserInputTransactionId = async (address: Text, transactionId: Text) => {
  return get(actor)
    .setUserInputTransactionId(address, transactionId)
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        return response.ok;
      } else {
        alerts.addAlert("Unable to set transaction ID given by user.", Status.ERROR);
        alertVisibility.showAlert();
        return null;
      }
    })
    .catch((err: any): any => {
      alerts.addAlert(err, Status.ERROR);
      alertVisibility.showAlert();
      return null;
    });
};
