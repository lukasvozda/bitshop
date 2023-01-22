import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts, alertVisibility } from "@/stores/alerts";
import type { ApiResponse } from "@/types";
import { get, writable } from "svelte/store";

export const paymentAddress = writable(null);

export const callTestNoOp = async () => {
  return get(actor)
    .noOp()
    .then((response: ApiResponse) => {
      console.log(response);
      if ("ok" in response) {
        alerts.addAlert("Successfully called no-op.", Status.SUCCESS);
      } else {
        alerts.addAlert(response.err, Status.ERROR);
      }
    })
    .catch((err) => {
      console.log(err);
      alerts.addAlert(err, Status.ERROR);
      return null;
    })
    .finally(() => alertVisibility.showAlert());
};

export const setOwnerXPUB = async (newOwnerXPUB: string) => {
  return get(actor)
    .setOwnerXPUB(newOwnerXPUB)
    .then((response: ApiResponse) => {
      if (response.ok) {
        alerts.addAlert("Successfully updated value of the extended public key.", Status.SUCCESS);
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

export const deleteOwnerXPUB = async () => {
  return get(actor)
    .deleteOwnerXPUB()
    .then((response: ApiResponse) => {
      if (response.ok) {
        alerts.addAlert("Successfully deleted value of the extended public key.", Status.SUCCESS);
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

export const getOwnerXPUB = async () => {
  return await get(actor).getOwnerXPUB();
};

export const getNewPaymentAddress = async () => {
  return get(actor)
    .generateNextPaymentAddress()
    .then((response: ApiResponse) => {
      if (response.ok) {
        paymentAddress.set(response.ok);
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
