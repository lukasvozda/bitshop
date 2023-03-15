<script lang="ts">
  import { products, categories } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";
  import { ArrowDownIcon, ArrowRightIcon, ArrowLeftIcon } from "svelte-feather-icons";
  import BitshopLogo from "@/lib/components/ui/BitshopLogo.svelte";
  import { Circle } from "svelte-loading-spinners";

  let showAllCategories = false;

  let scroll;
  let speed = 0.35;

  function scrollIntoView({ target }) {
    const el = document.querySelector(target.getAttribute("href"));
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth"
    });
  }
</script>

<svelte:window bind:scrollY={scroll} />

<main>
  <div class="hero-background overflow-hidden">
    <div class="hero">
      <div class="hero-content sm:w-full md:w-3/4 my-20 text-center sm:text-left">
        <div
          class="md:mr-auto transform-gpu"
          style:transform={`translate3d(0, ${scroll * speed}px, ${scroll}px)`}
        >
          <h1 class="flex items-end justify-center sm:justify-start">
            <span class="w-1/5 sm:pb-3">
              <BitshopLogo />
            </span>
            <span
              class="text-gray-800 text-6xl sm:text-9xl font-normal tracking-wider ml-2 cursor-default"
            >
              itshop
            </span>
          </h1>

          <h2 class="text-gray-900 font-medium my-8 cursor-default">
            Breaking the narrative that<br /> you can't buy anything with Bitcoin.
          </h2>

          <a
            href="#categories"
            on:click|preventDefault={scrollIntoView}
            class="btn gap-2 bg-base-100/70 text-gray-800 border-none hover:bg-base-100/90 hover:scale-110 my-3 rounded-xl shadow-sm"
          >
            u can see me now <ArrowDownIcon class="animate-bounce text-gray-800" size="20" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <section class="container w-5/6 md:w-3/4 mx-auto mt-16 z-20" id="categories">
    <div class="uppercase text-gray-600 text-sm my-3 mx-1 py-3">categories</div>
    <div class="flex flex-wrap mb-8">
      {#each showAllCategories ? $categories : $categories.slice(0, 5) as category, _}
        <button
          class="btn btn-sm btn-outline mx-1 my-1 rounded-xl border-1 font-semibold px-3 text-md !px-5 !h-2 !py-0"
        >
          {category[1].name}
        </button>
      {/each}
      <button
        on:click={() => (showAllCategories = !showAllCategories)}
        class="btn btn-sm  mx-1 my-1 rounded-xl border-1 font-semibold px-3 text-md !px-5 !h-2 !py-0 gap-2"
      >
        {showAllCategories ? "show less" : "show all"}
        <span class="swap swap-rotate" class:swap-active={showAllCategories}>
          <span class="swap-on">
            <ArrowLeftIcon size="15" />
          </span>
          <span class="swap-off">
            <ArrowRightIcon class="swap-off" size="15" />
          </span>
        </span>
      </button>
    </div>
    <div class="flex flex-wrap">
      {#if $products.length === 0}
        <div class="flex w-full items-center justify-center my-24">
          <Circle size="100" color="gray" />
        </div>
      {:else}
        {#each $products as product, _}
          <div class="w-full sm:w-1/2 md:1/3 lg:w-1/4 px-2 py-2">
            <ProductCard product={product[1]} />
          </div>
        {/each}
      {/if}
    </div>
  </section>
</main>
