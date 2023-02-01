<script>
  import { page } from "$app/stores";
  import "@/app.postcss";
  import Alert from "@/lib/components/ui/Alert.svelte";
  import { alertVisibility } from "@/stores/alerts";
  import { productsInCart } from "@/stores/cart";
  import BitshopLogo from "@/lib/components/ui/BitshopLogo.svelte";
  import { UserIcon, ShoppingBagIcon, TwitterIcon, GithubIcon } from "svelte-feathers";

  $: routeId = $page.route.id;

  alertVisibility.hideAlert();
</script>

<div class="hero-background py-8 flex justify-center">
  <div
    class="navbar flex justify-between transition ease-in-out duration-400 bg-base-100/70 hover:bg-base-100/100 md:w-3/4 rounded-3xl mx-4 shadow-sm"
  >
    <div class="w-7 ml-2">
      <a href="/" class="transition ease-in-out duration-400">
        <BitshopLogo />
      </a>
    </div>
    <div>
      <a href="/about" class="btn btn-ghost normal-case text-lg sm:text-2xl font-medium !px-1">
        About
      </a>
      <a href="/admin" class="btn btn-ghost btn-square mx-1">
        <UserIcon size="25" />
      </a>
      <a href="/cart" class="btn btn-ghost btn-square mx-1">
        <div class="indicator">
          <ShoppingBagIcon size="25" />
          {#if $productsInCart.length > 0}
            <span class="badge badge-sm indicator-item">{$productsInCart.length}</span>
          {/if}
        </div>
      </a>
    </div>
  </div>
</div>

<Alert />

<slot class="mb-6" />

<div class="bg-gray-800 py-16 mt-16">
  <div class="w-5/6 mx-auto flex flex-col sm:flex-row justify-between">
    <div class="flex flex-col justify-between items-center sm:items-start">
      <div class="w-2/6 px-6 py-6 border border-white border-4 rounded-3xl mt-5 mb-3">
        <BitshopLogo color="white" />
      </div>
      <div class="uppercase text-white text-sm font-semibold mt-3 mb-5 sm:mb-0">
        <span>Developed by</span>
        <span class="block">Lukas Vozda</span>
        <span>Martina Grzybowska</span>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between">
      <div class="flex mt-8 mb-3">
        <a href="https://twitter.com/bitshopicp" target="_blank">
          <TwitterIcon
            size="60"
            class="text-white mr-6 hover:text-gray-400 ease-in-out duration-800"
          />
        </a>
        <a href="https://github.com/lukasvozda/bitshop" target="_blank">
          <GithubIcon size="60" class="text-white hover:text-gray-400 ease-in-out duration-800" />
        </a>
      </div>
      <div>
        <div class="mb-2">
          <img src="/ic-logo.svg" width="100" class="mx-auto" />
        </div>
        <div class="text-white text-right">powered by crypto</div>
      </div>
    </div>
  </div>
</div>
