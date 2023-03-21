<script>
  import { productsInCart, totalPrice } from "@/stores/cart";
  import { Btc } from "svelte-cryptoicon";
  import { PlusIcon, MinusIcon, TrashIcon } from "svelte-feather-icons";
</script>

<div>
  {#each $productsInCart as item, index}
    <div class="flex w-full odd:bg-gray-100 rounded-lg px-2 py-2 md:px-3 md:py-3 items-center">
      <div class="avatar">
        <div class="w-16 md:w-28 rounded-md">
          <a
            href="/products/{item.product.slug}"
            class="hover:opacity-75 transition duration-200 ease-in rounded-md"
          >
            {#if item.product.img != ""}
              <img
                src="http://127.0.0.1:8008/?canisterId={import.meta.env
                  .VITE_BACKEND_CANISTER_ID}&imgid={item.product.img}"
                alt={item.product.title}
              />
            {:else}
              <img src="/product.jpg" alt={item.product.title} />
            {/if}
          </a>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-between md:grow px-2">
        <div>
          <a
            href="/products/{item.product.slug}"
            class="font-semibold text-gray-700 capitalize text-xs md:text-lg md:px-4"
          >
            {item.product.title}
          </a>
        </div>
        <div class="flex items-center font-mono text-xs md:text-lg md:px-4">
          {(item.product.price * item.quantity).toFixed(8)}
          <div class="ml-1 opacity-80">
            <span>SATs</span>
            <!--            <Btc size="14" color="black" />-->
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center ml-auto">
        <div class="font-mono mx-3 text-sm md:text-lg mb-2 md:mb-0 md:px-5">{item.quantity}x</div>
        <div class="flex flex-1">
          <button
            class="btn btn-circle btn-xs md:btn-sm hover:bg-gray-600 mx-1"
            on:click={() => productsInCart.addProduct(item.product)}
          >
            <PlusIcon size="16" />
          </button>
          <button
            class="btn btn-circle btn-xs md:btn-sm hover:bg-gray-600 mx-1"
            on:click={() => productsInCart.removeProduct(item.product.id)}
          >
            <MinusIcon size="16" />
          </button>
          <button
            class="btn btn-circle btn-xs md:btn-sm hover:bg-gray-600 mx-1"
            on:click={() => productsInCart.removeProductCompletely(item.product.id)}
          >
            <TrashIcon size="16" />
          </button>
        </div>
      </div>
    </div>
  {/each}
  <div class="mt-12">
    <div class="text-gray-500 text-lg uppercase">total</div>
    <div class="flex">
      <span class="font-bold text-gray-700 text-2xl font-mono">{$totalPrice}</span>
      <div class="ml-1 mt-1 opacity-80">
        <span>SATs</span>
        <!--        <Btc size="25" color="black" />-->
      </div>
    </div>
  </div>
</div>
