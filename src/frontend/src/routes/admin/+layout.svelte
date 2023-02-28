<script>
  import { page } from "$app/stores";
  import { BoxIcon, SettingsIcon, HomeIcon, GridIcon, ShoppingCartIcon } from "svelte-feathers";

  $: routeId = $page.route.id;

  export const prerender = true;
</script>

<div class="w-5/6 md:w-3/4 mx-auto mt-8">
  <div class="flex flex-wrap">
    <div class="w-2/6 md:w-1/4 mx-auto">
      <h3>Menu</h3>
      <ul class="menu bg-base-100 w-56 p-2 rounded-box shadow-lg">
        <li>
          <a class:active={routeId == "/admin"} href="/admin">
            <HomeIcon size="20" />
            Dashboard
          </a>
        </li>
        <li>
          <a class:active={routeId.includes("/admin/products")} href="/admin/products">
            <BoxIcon size="20" />
            Products
          </a>
        </li>
        <li>
          <a class:active={routeId.includes("/admin/orders")} href="/admin/orders">
            <ShoppingCartIcon size="20" />
            Orders
          </a>
        </li>
        <li>
          <a class:active={routeId.includes("/admin/categories")} href="/admin/categories">
            <GridIcon size="20" />
            Categories
          </a>
        </li>
        <li>
          <a class:active={routeId == "/admin/settings"} href="/admin/settings">
            <SettingsIcon size="20" />
            Settings
          </a>
        </li>
      </ul>
    </div>
    <div class="w-4/6 md:w-3/4 mx-auto">
      <slot />
    </div>
  </div>
</div>
