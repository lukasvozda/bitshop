import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts } from "@/stores/alerts";
import type { ApiResponse } from "@/types";
import { get, writable } from "svelte/store";

export const paymentAddress = writable(null);

export const setOwnerXPUB = async (newOwnerXPUB: string) => {
  return await get(actor).setOwnerXPUB(newOwnerXPUB);
};

export const deleteOwnerXPUB = async () => {
  return await get(actor).deleteOwnerXPUB();
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
    });
};
