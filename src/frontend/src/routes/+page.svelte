<script lang="ts">
  import { actor } from "@/stores";
  import { products } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";

  let disabled = false;
  let title = "";
  let price = 1.0;

  // This will later be in the admin section
  const submitProduct = async () => {
    disabled = true;
    let product = {
      title: title,
      price: price,
      category: "t-shirts",
      description: "Product description",
      inventory: 10,
      status: { active: null }
    };
    let res = await $actor.create_product(product); // BigInt TS wtf
    // TODO handle errors
    console.log(res);

    if ("ok" in res) {
      console.log("updating store");

      // We are guessing product ID and don't know a slug, maybe better off to pull data from the backend again
      var size = $products.length;
      $products = [...$products, [toString(size), product]];
    }
    disabled = false;
  };
</script>

<main>
  <h2>Homepage</h2>
  <img src="logo2.svg" alt="DFINITY logo" />
  <div class="divider" />
  <section class="ml-4">
    <h1 class="my-4">Products</h1>
    <form on:submit|preventDefault={submitProduct}>
      <label for="title">Title: &nbsp;</label>
      <input
        id="title"
        alt="title"
        type="text"
        placeholder="Title"
        class="input input-bordered input-primary w-full max-w-xs"
        bind:value={title}
        {disabled}
      />
      <label for="price" class="input-group my-4">
        Price: &nbsp;
        <input
          id="price"
          alt="price"
          type="number"
          placeholder="1"
          class="input input-bordered input-primary"
          bind:value={price}
          {disabled}
        />
        <span>BTC</span>
      </label>
      {#if disabled === true}
        <button type="submit" class="btn btn-primary my-4 loading ">Create product</button>
      {:else}
        <button type="submit" class="btn btn-primary my-4">Create product</button>
      {/if}
    </form>
    <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {#each $products as p}
        <ProductCard product={p[1]} />
      {/each}
    </div>
  </section>
</main>

<style lang="postcss">
  img {
    max-width: 50vw;
    max-height: 25vw;
    display: block;
    margin: auto;
  }
</style>
