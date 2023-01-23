import type { Status } from "@/lib/utils";
import type { Alert } from "@/types";
import { writable } from "svelte/store";

function fetchAlertVisibility() {
  const { subscribe, update } = writable(false);
  const showAlert = () => update(() => true);
  const hideAlert = () => update(() => false);
  return {
    subscribe,
    showAlert,
    hideAlert
  };
}

export const alertVisibility = fetchAlertVisibility();

function fetchAlerts() {
  const { subscribe, update } = writable([]);

  const addAlert = (message: string, type: Status, time = "") =>
    update((alerts: Alert[]) => {
      alerts.push({
        message,
        type,
        time: time || new Date().toLocaleTimeString()
      });
      return alerts;
    });

  return {
    subscribe,
    addAlert
  };
}

export const alerts = fetchAlerts();
