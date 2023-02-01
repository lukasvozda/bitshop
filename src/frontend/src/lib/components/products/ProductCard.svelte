<script lang="ts">
  import type { Product } from "@/types";
  import { Btc } from "svelte-cryptoicon";
  export let product: Product;
</script>

<a
  class="block group card bg-base-100 shadow-md rounded-md hover:shadow-lg"
  href="/products/{product.slug}"
>
  <figure class="group-hover:opacity-75 cursor-pointer transition ease-in-out duration-800">
    <img src="/product.jpg" alt={product.title} />
  </figure>
  <div class="card-body !px-4 !py-3">
    <div class="capitalize text-md font-bold mb-0">{product.title}</div>
    <div class="flex">
      <div class="flex items-center">
        <span class="font-mono mr-1 text-sm">{product.price}</span>
        <Btc size="15" color="black" />
      </div>
      <button class="btn btn-sm !px-5 text-xs ml-auto">detail</button>
    </div>
  </div>
</a>
