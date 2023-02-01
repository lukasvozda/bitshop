<script>
  import { productsInCart, totalPrice } from "@/stores/cart";
  import { Btc } from "svelte-cryptoicon";
  import { PlusIcon, MinusIcon, TrashIcon } from "svelte-feather-icons";

  let testProducts = [
    { id: 1, title: "Death Eater mask", price: 0.1, category: "blabla1" },
    { id: 2, title: "Gryffindor sword", price: 0.0005, category: "blabla2" },
    { id: 3, title: "Toilet paper", price: 1.0, category: "blabla3" }
  ];

  productsInCart.addProduct(testProducts[0]);
  productsInCart.addProduct(testProducts[0]);
  productsInCart.addProduct(testProducts[1]);
  productsInCart.addProduct(testProducts[2]);
</script>

<div class="my-10 mx-10">
  <div class="grid grid-cols-4 gap-y-2">
    {#each $productsInCart as item, index}
      <div class="col-span-2 flex odd:bg-gray-100 py-3 pl-1 rounded-l-box">
        <div class="max-w-[15%]">
          <img src="/paper.jpeg" alt="Image 1" class="mask mask-square" />
        </div>
        <div class="flex flex-col justify-center">
          <div class="font-semibold text-gray-700">{item.product.title}</div>
        </div>
      </div>
      <div class="flex items-center font-mono even:bg-gray-100">
        {(item.product.price * item.quantity).toFixed(8)}
        <div class="ml-1 opacity-80">
          <Btc size="16" color="black" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-x-2 items-center odd:bg-gray-100 rounded-r-box">
        <div class="font-mono">{item.quantity}x</div>
        <div class="col-span-2">
          <button
            class="btn btn-circle btn-sm hover:bg-gray-600"
            on:click={() => productsInCart.addProduct(item.product)}
          >
            <PlusIcon size="18" />
          </button>
          <button
            class="btn btn-circle btn-sm hover:bg-gray-600"
            on:click={() => productsInCart.removeProduct(item.product.id)}
          >
            <MinusIcon size="18" />
          </button>
          <button
            class="btn btn-circle btn-sm hover:bg-gray-600"
            on:click={() => productsInCart.removeProductCompletely(item.product.id)}
          >
            <TrashIcon size="18" />
          </button>
        </div>
      </div>
    {/each}
  </div>
  <div class="mt-12">
    <div class="text-gray-500 text-lg uppercase">total</div>
    <div class="flex">
      <span class="font-bold text-gray-700 text-2xl font-mono">{$totalPrice}</span>
      <div class="ml-1 mt-1 opacity-80">
        <Btc size="25" color="black" />
      </div>
    </div>
  </div>
</div>
