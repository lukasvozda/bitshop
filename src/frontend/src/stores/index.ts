import { writable } from "svelte/store";
import { createActor } from "../../../declarations/backend";

const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
const host = import.meta.env.VITE_HOST;

function fetchActor() {
  const { subscribe, set } = writable(null);
  const init = () => set(createActor(canisterId, { agentOptions: { host } }));
  // const loadProducts = async (actor) => { 
  //   console.log("getting products from hooks")
  //   const products = await actor.list_products()
  //   console.log(products)
  //   return products;
  // }
  return {
    subscribe,
    //loadProducts,
    init
  };
}

export const actor = fetchActor();
