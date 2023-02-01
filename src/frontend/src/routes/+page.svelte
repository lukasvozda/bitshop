<script lang="ts">
  import { products } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";
  import { ArrowDownIcon } from "svelte-feather-icons";
  import BitshopLogo from "@/lib/components/ui/BitshopLogo.svelte";
</script>

<main>
  <div class="hero-background">
    <div class="hero">
      <div class="hero-content sm:w-full md:w-3/4 my-20 text-center sm:text-left">
        <div class="md:mr-auto">
          <h1 class="flex items-end justify-center sm:justify-start">
            <span class="w-1/5 sm:pb-3">
              <BitshopLogo />
            </span>
            <span class="text-gray-800 text-6xl sm:text-9xl font-normal tracking-wider ml-2">
              itshop
            </span>
          </h1>

          <h2 class="text-gray-900 font-medium my-8">
            Breaking the narrative that<br /> you can't buy anything with Bitcoin.
          </h2>

          <a
            href="#"
            class="btn gap-2 bg-base-100/70 text-gray-800 border-none hover:bg-base-100/90 hover:scale-110 my-3 rounded-xl shadow-sm"
          >
            u can see me now <ArrowDownIcon class="text-gray-800" size="20" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <section class="container w-4/5 mx-auto mt-16">
    <div class="uppercase text-gray-600 text-sm my-3 mx-1">categories</div>
    <!--    TODO foreach for categories-->
    <div class="flex flex-wrap mb-8">
      {#each ["t-shirts", "sunglasses", "hoodies", "socks", "caps"] as category, _}
        <button
          class="btn btn-sm btn-outline mx-1 my-1 rounded-xl border-1 font-semibold px-3 text-md !px-5 !h-2 !py-0"
        >
          {category}
        </button>
      {/each}
    </div>
    <div class="flex flex-wrap">
      {#each $products as product, _}
        <div class="w-full w-full sm:w-1/2 md:1/3 lg:w-1/4 px-2 py-2">
          <ProductCard product={product[1]} />
        </div>
      {/each}
    </div>
  </section>
</main>
