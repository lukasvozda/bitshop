import { writable } from "svelte/store";
import { createActor } from "../../../declarations/backend";

const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
const host = import.meta.env.VITE_HOST;

function fetchActor() {
  const { subscribe, set } = writable(null);
  const init = () => set(createActor(canisterId, { agentOptions: { host } }));
  return {
    subscribe,
    init
  };
}

export const actor = fetchActor();
