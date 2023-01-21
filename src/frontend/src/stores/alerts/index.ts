import type { Alert, STATUS } from "@/types";
import { writable } from "svelte/store";

export const alerts = writable([]);

export const createAlert = (message: string, type: STATUS, time = ""): Alert => ({
  message,
  type,
  time: time || new Date().toLocaleTimeString()
});
