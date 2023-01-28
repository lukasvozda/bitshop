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
  <div class="grid grid-cols-4 gap-4">
    <div class="text-gray-700 col-span-2 font-bold uppercase">Product</div>
    <div class="text-gray-700 font-bold uppercase">Price</div>
    <div class="text-gray-700 font-bold uppercase">Quantity</div>
    {#each $productsInCart as item, index}
      <div class="col-span-2 flex">
        <div class="max-w-[15%]">
          <img src="/paper.jpeg" alt="Image 1" class="mask mask-squircle" />
        </div>
        <div class="flex flex-col justify-center">
          <div class="font-bold text-gray-700">{item.product.title}</div>
          <div class="text-gray-400 text-sm">{item.product.category}</div>
        </div>
      </div>
      <div class="flex items-center font-mono">
        {(item.product.price * item.quantity).toFixed(8)}
        <div class="ml-1">
          <Btc size="16" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <div class="font-mono">{item.quantity}</div>
        <div class="col-span-2">
          <button
            class="btn btn-circle btn-sm"
            on:click={() => productsInCart.addProduct(item.product)}
          >
            <PlusIcon size="18" />
          </button>
          <button
            class="btn btn-circle btn-sm"
            on:click={() => productsInCart.removeProduct(item.product.id)}
          >
            <MinusIcon size="18" />
          </button>
          <button
            class="btn btn-circle btn-sm"
            on:click={() => productsInCart.removeProductCompletely(item.product.id)}
          >
            <TrashIcon size="18" />
          </button>
        </div>
      </div>
      <div class="col-span-4 my-0">
        <div class="w-full border-b border-gray-300" />
      </div>
    {/each}
  </div>
  <div class="mt-12">
    <div class="text-gray-500 text-lg uppercase">total</div>
    <div class="flex">
      <span class="font-bold text-gray-700 text-2xl font-mono">{$totalPrice}</span>
      <div class="ml-1 mt-1">
        <Btc size="25" />
      </div>
    </div>
  </div>
</div>
