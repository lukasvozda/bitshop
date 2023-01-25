<script>
  import { page } from "$app/stores";

  $: routeId = $page.route.id;
  export const prerender = true;
</script>

<h2>Submenu</h2>
<a class="link link-primary" href="/admin">Dashboard</a>
<a class="link link-primary" href="/admin/products">Products</a>
<a class="link link-primary" href="/admin/categories">Categories</a>
<a class="link link-primary" href="/admin/orders">Orders</a>
<a class="link link-primary" href="/admin/settings">Settings</a>

<div class="divider" />
<slot />
<p>This page will be visible to logged in users only.</p>
