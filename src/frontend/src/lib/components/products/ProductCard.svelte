<script lang="ts">
  import type { Product } from "@/types";
  import { Btc } from "svelte-cryptoicon";
  export let product: Product;
</script>

<a
  class="block group card bg-base-100 shadow-md rounded-md hover:shadow-lg overflow-hidden transition duration-300 transform-gpu"
  href="/products/{product.slug}"
>
  <figure class="cursor-pointer">
    <img
      src={product.img}
      alt={product.title}
      class="group-hover:scale-105 ease-in group-hover:opacity-75 transition duration-300 transform-gpu"
    />
  </figure>
  <div class="card-body !px-4 !py-3 z-40">
    <div class="capitalize text-md font-bold mb-0">{product.title}</div>
    <div class="flex">
      <div class="flex items-center">
        <span class="font-mono mr-1 text-sm">{product.price}</span>
        <Btc size="15" color="black" />
      </div>
      <button class="btn btn-sm !px-5 text-xs ml-auto hover:scale-105 duration-200">detail</button>
    </div>
  </div>
</a>
