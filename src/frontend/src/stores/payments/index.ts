import { actor } from "@/stores";
import { alerts, createAlert } from "@/stores/alerts";
import type { ApiResponse } from "@/types";
import { STATUS } from "@/types";
import { writable } from "svelte/store";

export const paymentAddress = writable(null);

export const setOwnerXPUB = async (newOwnerXPUB: string) => {
  return await actor.setOwnerXPUB(newOwnerXPUB);
};

export const deleteOwnerXPUB = async () => {
  return await actor.deleteOwnerXPUB();
};

export const getOwnerXPUB = async () => {
  return await actor.getOwnerXPUB();
};

export const getNewPaymentAddress = async () => {
  return actor.generateNextPaymentAddress().then((response: ApiResponse) => {
    if (response.ok) {
      paymentAddress.set(response.ok);
      return response.ok;
    } else {
      alerts.update((alerts) => {
        alerts.push(createAlert(response.err, STATUS.ERROR));
        return alerts;
      });
      return null;
    }
  });
};
