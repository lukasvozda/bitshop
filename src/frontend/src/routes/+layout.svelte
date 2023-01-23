<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import { actor } from "@/stores";
  import "@/app.postcss";
  import Alert from "@/lib/components/ui/Alert.svelte";
  import { alertVisibility } from "@/stores/alerts";

  $: routeId = $page.route.id;

  const init = async () => {
    try {
      actor.init();
      await listProducts();
    } catch (err) {
      console.error(err);
    }
  };

  export const listProducts = async () => {
    try {
      // Call the IC
      const response = await $actor.list_products();
      console.log(response);
      products.set(response);
    } catch (err) {
      console.error(err);
    }
  };

  alertVisibility.hideAlert();

  onMount(init);
</script>

<img src="bsvg.svg" width="200" alt="DFINITY logo" />
<h1>Bitshop</h1>
<a class="link link-primary" class:active={routeId == "/"} href="/">Home</a>
<a class="link link-primary" class:active={routeId == "/about"} href="/about">About</a>
<a class="link link-primary" class:active={routeId == "/admin"} href="/admin">Admin</a>
<a class="link link-primary" class:active={routeId == "/cart"} href="/cart">Cart</a>
<div class="divider" />

<Alert />

<slot />
