<script lang="ts">
  import type { Product } from "@/types";
  export let product: Product;
</script>

<div class="group relative card card-compact bg-base-100 shadow-xl">
  <!-- TODO: add dynamic product loading later -->
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
    <a href="/product/{product.slug}">
      <img
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        src="/product.jpg"
        alt="Shoes"
      />
    </a>
  </div>
  <div class="card-body">
    <div class="absolute left-5 bottom-5">
      <h2 class="card-title">{product.title}</h2>
      <p>{product.price} BTC</p>
    </div>
    <div class="card-actions h-14 justify-end">
      <a href="/product/{product.slug}" class="btn btn-sm">Detail</a>
    </div>
  </div>
</div>
