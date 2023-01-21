<script lang="ts">
	import { onMount } from 'svelte';
	import { createActor } from '../../../declarations/backend';

	// Canister IDs are automatically expanded to .env config - see vite.config.ts
	const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

	// We pass the host instead of using a proxy to support NodeJS >= v17 (ViteJS issue: https://github.com/vitejs/vite/issues/4794)
	const host = import.meta.env.VITE_HOST;

	// Create an actor to interact with the IC for a particular canister ID
	// TODO this is throwing TypeError: fetch failed in the terminal when exposed here (doesnt happen when called later)
	const actor = createActor(canisterId, { agentOptions: { host } });

	let input = '';
	let disabled = false;
	let greeting = '';
	let title = '';
	let price = 0;
	let products = [];

	const handleOnSubmit = async () => {
		disabled = true;

		try {
			// Call the IC
			greeting = await actor.greet(input);
		} catch (err: unknown) {
			console.error(err);
		}

		disabled = false;
	};

	const listProducts = async () => {
		console.log('getting products');
		try {
			// Call the IC
			products = await actor.list_products();
			console.log(products);
		} catch (err: unknown) {
			console.error(err);
		}
	};

	const submitProduct = async () => {
		disabled = true;
		let result = await actor.create_product({ title: title, price: BigInt(price), category: 0 }); // BigInt TS wtf
		// TODO handle errors
		console.log(result);
		listProducts();
		disabled = false;
	};

	onMount(listProducts);
</script>

<main>
	<h1>Homepage</h1>
	<img src="logo2.svg" alt="DFINITY logo" />
	<br />
	<br />
	<div class="alert alert-info shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Test version</span>
		</div>
	</div>

	<form on:submit|preventDefault={handleOnSubmit}>
		<label for="name">Enter your name: &nbsp;</label>
		<input id="name" alt="Name" type="text" bind:value={input} {disabled} />
		{#if disabled === true}
			<button type="submit" class="btn btn-primary loading">Click Me!</button>
		{:else}
			<button type="submit" class="btn btn-primary">Click Me!</button>
		{/if}
	</form>

	<section id="greeting">
		{greeting}
	</section>
	<hr />
	<section>
		<h1>Products</h1>
		<form on:submit|preventDefault={submitProduct}>
			<label for="title">Title: &nbsp;</label>
			<input id="title" alt="title" type="text" bind:value={title} {disabled} />
			<label for="price">Price: &nbsp;</label>
			<input id="price" alt="price" type="number" bind:value={price} {disabled} />
			{#if disabled === true}
				<button type="submit" class="btn btn-primary loading">Create product</button>
			{:else}
				<button type="submit" class="btn btn-primary">Create product</button>
			{/if}
		</form>
		<div class="products">
			{#each products as p}
				<div class="product">
					<span class="id">#{p[0]} - </span>
					<span class="title">{p[1].title} - </span>
					<span class="price">{p[1].price} BTC</span>
					<!-- <span class="category">Category: {p[1].category}</span> -->
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	img {
		max-width: 50vw;
		max-height: 25vw;
		display: block;
		margin: auto;
	}

	form {
		display: flex;
		justify-content: center;
		gap: 0.5em;
		flex-flow: row wrap;
		max-width: 40vw;
		margin: auto;
		align-items: baseline;
		font-family: sans-serif;
		font-size: 1.5rem;
	}

	button[type='submit'] {
		padding: 5px 20px;
		margin: 10px auto;
		float: right;
	}

	#greeting {
		margin: 10px auto;
		padding: 10px 60px;
		border: 1px solid #222;
	}

	#greeting:empty {
		display: none;
	}

	.product {
		border: 1px solid black;
		margin: 5px;
		padding: 5px;
	}
</style>
