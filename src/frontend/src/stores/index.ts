import { createActor } from '../../../declarations/backend';

// Canister IDs are automatically expanded to .env config - see vite.config.ts
const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
// We pass the host instead of using a proxy to support NodeJS >= v17 (ViteJS issue: https://github.com/vitejs/vite/issues/4794)
const host = import.meta.env.VITE_HOST;

export const actor = createActor(canisterId, { agentOptions: { host } });
