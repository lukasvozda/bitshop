import { Status } from "@/lib/utils";
import { actor } from "@/stores";
import { alerts, alertVisibility } from "@/stores/alerts";
import type { ApiResponse } from "@/types";
import { get } from "svelte/store";

export const setOwnerXPUB = async (newOwnerXPUB: string) => {
  return get(actor)
    .setOwnerXPUB(newOwnerXPUB)
    .then((response: ApiResponse) => {
      if ("ok" in response) {
        alerts.addAlert("Successfully updated value of the extended public key.", Status.SUCCESS);
        return response.ok;
      } else {
        alerts.addAlert("Unable to update public key.", Status.ERROR);
        return null;
      }
    })
    .catch((): null => {
      alerts.addAlert("Unable to update public key.", Status.ERROR);
      return null;
    })
    .finally(() => alertVisibility.showAlert());
};

export const getOwnerXPUB = async () => {
  return await get(actor).getOwnerXPUB();
};
