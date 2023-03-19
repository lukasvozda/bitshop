<script>
  import { page } from "$app/stores";
  import {
    BoxIcon,
    SettingsIcon,
    HomeIcon,
    GridIcon,
    ShoppingCartIcon,
    LogOutIcon
  } from "svelte-feathers";
  import { onMount } from "svelte";
  import { AuthClient } from "@dfinity/auth-client";
  import { Actor } from "@dfinity/agent";
  import { actor, loggedIn, userId } from "@/stores";

  $: routeId = $page.route.id;
  let client;

  const APPLICATION_NAME = "Bitshop";
  const APPLICATION_LOGO_URL = "https://ughim-6qaaa-aaaah-qc7qa-cai.ic0.app/bitshop_logo_small.jpg";

  const AUTH_PATH =
    "/authenticate/?applicationName=" +
    APPLICATION_NAME +
    "&applicationLogo=" +
    APPLICATION_LOGO_URL +
    "#authorize";

  const init = async () => {
    client = await AuthClient.create();
    if (await client.isAuthenticated()) {
      if (import.meta.env.MODE != "development") {
        // Only assign identity on the mainnet to the agent, send anonymouse call locally for now
        Actor.agentOf($actor).replaceIdentity(client.getIdentity());
      }
      userId.set(client.getIdentity().getPrincipal().toString());
      loggedIn.set(true);
    }
  };

  function handleAuth() {
    if (import.meta.env.MODE != "development") {
      Actor.agentOf($actor).replaceIdentity(client.getIdentity());
    }
    userId.set(client.getIdentity().getPrincipal().toString());
    loggedIn.set(true);
  }

  const login = async () => {
    client.login({
      identityProvider: "https://nfid.one" + AUTH_PATH,
      //identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: handleAuth,
      windowOpenerFeatures: `
      left=${window.screen.width / 2 - 525 / 2},
      top=${window.screen.height / 2 - 705 / 2},
      toolbar=0,location=0,menubar=0,width=525,height=705
    `
    });
  };

  async function logout() {
    await client.logout();
    userId.set("");
    loggedIn.set(false);
  }

  onMount(init);
</script>

{#if $loggedIn}
  <div class="w-5/6 md:w-3/4 mx-auto mt-8">
    <div class="flex my-4">
      <div class="mr-auto">
        <h1>Hello, {$userId.slice(0, 17) + "..."}</h1>
      </div>
      <div class="ml-auto">
        <button class="btn" on:click={logout}><LogOutIcon size="20" /></button>
      </div>
    </div>
    <div class="divider" />
  </div>
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
{:else}
  <div class="hero min-h-screen ">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Please log in</h1>
        <p class="py-6">You will not be able to see admin panel unless you log in.</p>
        <button class="btn" on:click={login}>Log in</button>
      </div>
    </div>
  </div>
{/if}
