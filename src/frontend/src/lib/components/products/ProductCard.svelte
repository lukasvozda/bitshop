<script lang="ts">
  import type { Product } from "@/types";
  export let product: Product;

  let imageSource = "";

  $: {
    if (product?.img) {
      if (import.meta.env.MODE == "development") {
        imageSource = `http://127.0.0.1:8008/?canisterId=${
          import.meta.env.VITE_BACKEND_CANISTER_ID
        }&imgid=${product.img}`;
      } else {
        imageSource = `https://${import.meta.env.VITE_BACKEND_CANISTER_ID}.raw.ic0.app/?imgid=${
          product.img
        }`;
      }
    } else {
      imageSource = "/product.jpg";
    }
  }
</script>

<a
  class="block group card bg-base-100 shadow-md rounded-md hover:shadow-lg overflow-hidden transition duration-300 transform-gpu"
  href="/products/{product.slug}"
>
  <figure class="cursor-pointer h-64">
    <img
      src={imageSource}
      alt={product.title}
      loading="lazy"
      class="group-hover:scale-105 ease-in group-hover:opacity-75 transition duration-300 transform-gpu object-cover h-full w-full"
    />
  </figure>
  <div class="card-body !px-4 !py-3 z-40">
    <div class="capitalize text-md font-bold mb-0 mt-1">
      {product.title}
      <span class="badge badge-ghost badge-sm font-light text-xs">{product.category}</span>
    </div>
    <div class="flex mt-5">
      <div class="flex items-center">
        <span class="font-mono mr-1 text-sm">{product.price} SATs</span>
        <!--        <Btc size="15" color="black" />-->
      </div>
      <button class="btn btn-sm !px-5 text-xs ml-auto hover:scale-105 duration-200">detail</button>
    </div>
  </div>
</a>
