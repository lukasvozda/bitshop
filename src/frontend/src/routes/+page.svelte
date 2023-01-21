<script>
	import { onMount } from 'svelte';
	import { createActor } from '../../../declarations/backend';
	import { actor, products } from '../stores.js';

	let input = '';
	let disabled = false; 
	let title = '';
	let price = 0;

	// This will later be in the admin section
	const submitProduct = async () => {
		disabled = true;
		let product = { title: title, price: BigInt(price), category: 0 }
		let res = await $actor.create_product(product); // BigInt TS wtf
		// TODO handle errors
		console.log(res);

		if ("ok" in res){
			console.log("updating store")

			// We are guessing product ID here, maybe better off to pull data from the backend again
			var size = $products.length
			$products = [...$products, [size, product]]
		}
		disabled = false;
	};

</script>

<main>
	<h2>Homepage</h2>
	<img src="logo2.svg" alt="DFINITY logo" />
	<div class="divider" />
	<section class="ml-4">
		<h1 class="my-4">Products</h1>
		<form on:submit|preventDefault={submitProduct}>
			<label for="title">Title: &nbsp;</label>
			<input  id="title" alt="title" type="text" placeholder="Title" class="input input-bordered input-primary w-full max-w-xs" bind:value={title} {disabled} />
			<label for="price" class="input-group my-4">
				Price: &nbsp;
				<input id="price" alt="price" type="number" placeholder="0.01" class="input input-bordered input-primary" bind:value={price} {disabled} />
				<span>BTC</span>
			  </label>
			{#if disabled === true}
				<button type="submit" class="btn btn-primary my-4 loading ">Create product</button>
			{:else}
				<button type="submit" class="btn btn-primary my-4">Create product</button>
			{/if}
		</form>
		<div class="products">
			{#each $products as p}
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
	.product {
		border: 1px solid black;
		margin: 5px;
		padding: 5px;
	}
</style>
