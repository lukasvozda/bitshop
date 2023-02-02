<script lang="ts">
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";
  import type { Product } from "@/types";
  import { Btc } from "svelte-cryptoicon";
  import { productsInCart } from "@/stores/cart";

  let product: Product;
  let productList: [string, Product][] = $products;
  let filteredProducts: [string, Product][];

  $: {
    let item = productList.find((p) => p[0] === $page.params.slug);
    if (item) {
      product = item[1];
    }
    filteredProducts = productList
      .filter((productWithId) => productWithId[0] != $page.params.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }
</script>

<section class="w-5/6 md:w-3/4 mx-auto py-14">
  {#if product}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-20 py-10">
      <div class="overflow-hidden order-last md:order-1">
        <img
          src={product.img}
          alt={product.title}
          class="hover:scale-110 transition ease-in duration-300 opacity-90 hover:opacity-100"
        />
      </div>
      <div class="flex flex-col order-2">
        <h1 class="text-5xl font-semibold text-gray-800 mb-3 capitalize">{product.title}</h1>
        <div class="badge uppercase badge-lg">{product.category}</div>
        <div class="my-7 flex-1">
          {product.description}
        </div>
        <div class="flex justify-between">
          <div>
            <div class="uppercase text-gray-500">price</div>
            <div class="flex items-center">
              <span class="font-mono text-2xl">{product.price}</span>
              <span class="ml-1">
                <Btc color="black" size="20" />
              </span>
            </div>
          </div>
          <button
            class="btn btn-lg rounded-xl"
            on:click|preventDefault={() => productsInCart.addProduct(product)}>add to cart</button
          >
        </div>
      </div>
    </div>
  {/if}
  <div class="divider" />
  <h2>Other products</h2>
  <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {#each filteredProducts as p}
      <ProductCard product={p[1]} />
    {/each}
  </div>
</section>
