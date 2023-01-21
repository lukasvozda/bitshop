<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createActor } from '../../../declarations/backend';
	import { actor, products } from '../stores.js';
	import '../app.postcss';

	$: routeId = $page.route.id;

	const init = async () => {
		try {
			// Canister IDs are automatically expanded to .env config - see vite.config.ts
			const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

			// We pass the host instead of using a proxy to support NodeJS >= v17 (ViteJS issue: https://github.com/vitejs/vite/issues/4794)
			const host = import.meta.env.VITE_HOST;

			// Create an actor to interact with the IC for a particular canister ID
			const canisterActor = createActor(canisterId, { agentOptions: { host } });

			actor.set(canisterActor);
		} catch (err) {
			console.error(err);
		}

		listProducts();
	};

	export const listProducts = async () => {
		try {
			// Call the IC
			const response = await $actor.list_products();
			//console.log(response);
			products.set(response);
		} catch (err) {
			console.error(err);
		}
	};

	onMount(init);
	export const prerender = true;
</script>
<img src="bsvg.svg" width="200" alt="DFINITY logo" />
<h1>Bitshop</h1>
<a class="link link-primary" class:active={routeId == '/'} href="/">Home</a>
<a class="link link-primary" class:active={routeId == '/about'} href="/about">About</a>
<a class="link link-primary" class:active={routeId == '/admin'} href="/admin">Admin</a>
<a class="link link-primary" class:active={routeId == '/cart'} href="/cart">Cart</a>
<div class="divider" />
<slot />
