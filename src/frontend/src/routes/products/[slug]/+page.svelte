<script lang="ts">
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";
  import type { Product } from "@/types";
  import { Btc } from "svelte-cryptoicon";
  import { productsInCart } from "@/stores/cart";
  import ConfirmationModal from "@/lib/components/ui/ConfirmationModal.svelte";
  import { CheckCircleIcon } from "svelte-feathers";
  import { fly } from "svelte/transition";

  let product: Product;
  let productList: [string, Product][] = $products;
  let filteredProducts: [string, Product][];
  let isOpenAddConfirm = false;

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

{#key product}
  <section class="w-5/6 md:w-3/4 mx-auto py-14" in:fly={{ x: -50, duration: 1500 }}>
    {#if product}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20 py-10">
        <div class="overflow-hidden order-last md:order-1">
          {#if product.img != ""}
            {#if import.meta.env.MODE == "development"}
              <img
                src="http://127.0.0.1:8008/?canisterId={import.meta.env
                  .VITE_BACKEND_CANISTER_ID}&imgid={product.img}"
                alt={product.title}
                class="hover:scale-110 transition ease-in duration-300 opacity-90 hover:opacity-100"
              />
            {:else}
              <img
                src="https://{import.meta.env
                  .VITE_BACKEND_CANISTER_ID}.raw.ic0.app/?imgid={product.img}"
                alt={product.title}
                class="hover:scale-110 transition ease-in duration-300 opacity-90 hover:opacity-100"
              />
            {/if}
          {:else}
            <img src="/product.jpg" alt="Default image" />
          {/if}
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
                <span class="font-mono text-2xl">{product.price} SATs</span>
                <!--              <span class="ml-1">-->
                <!--                <Btc color="black" size="20" />-->
                <!--              </span>-->
              </div>
            </div>
            <button
              class="btn btn-lg rounded-xl"
              on:click={() => {
                productsInCart.addProduct(product);
                isOpenAddConfirm = true;
                setTimeout(() => (isOpenAddConfirm = false), 500);
              }}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    {/if}
    <div>
      <div class="divider" />
      <h2>Similar products</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {#each filteredProducts as p}
          <ProductCard product={p[1]} />
        {/each}
      </div>
    </div>
  </section>
{/key}

<ConfirmationModal bind:isOpen={isOpenAddConfirm} displayCancel={false} displayConfirm={false}>
  <div class="flex flex-col items-center justify-center mt-5">
    <CheckCircleIcon size="80" class="text-success" />
    <div class="text-gray-700 text-xl mt-4">Product added to cart</div>
  </div>
</ConfirmationModal>
