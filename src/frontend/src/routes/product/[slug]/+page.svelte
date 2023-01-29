<script lang="ts">
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";
  import type { Product } from "@/types";

  let product: Product;
  let productList: [string, Product][] = $products;
  let filteredProducts: [string, Product][];

  $: {
    product = productList.find((p) => p[0] === $page.params.slug)[1];
    filteredProducts = productList
      .filter((productWithId) => productWithId[0] != $page.params.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }
</script>

{#if product}
  <h1>{product.title}</h1>
  <p>{product.description}</p>
  <p>{product.price} BTC</p>
  <p>{product.category}</p>
{/if}
<div class="divider" />
<h2>Other products</h2>
<div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
  {#each filteredProducts as p}
    <ProductCard product={p[1]} />
  {/each}
</div>
