<script>
  import { actor } from "@/stores";
  import { products, categories } from "@/stores/products";
  import ProductCard from "@/lib/components/products/ProductCard.svelte";

  let disabled = false;
  let title = "";
  let price = 1.0;
  let description = "";
  let inventory = 1;
  let selectedCategory = "";

  // This will later be in the admin section
  const submitProduct = async () => {
    disabled = true;
    let product = {
      title: title,
      price: price,
      category: selectedCategory,
      description: description,
      inventory: inventory,
      status: { active: null }
    };
    console.log(product);
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

<section class="ml-4 w-5/6 md:w-3/4">
  <h1 class="my-4">Products</h1>
  <form on:submit|preventDefault={submitProduct}>
    <div class="form-control w-full max-w-xs mt-2">
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
    </div>
    <div class="form-control w-full max-w-xs mt-2">
      <label for="title">Description: &nbsp;</label>
      <textarea
        class="textarea textarea-primary"
        placeholder="Description"
        bind:value={description}
        {disabled}
      />
    </div>
    <div class="form-control w-full max-w-xs mt-2">
      <label for="Category">Category: &nbsp;</label>
      <select
        class="select select-bordered select-primary w-full max-w-xs"
        bind:value={selectedCategory}
      >
        <option disabled selected>Select category</option>
        {#each $categories as c}
          <option value={c[0]}>{c[1].name}</option>
        {/each}
      </select>
    </div>
    <div class="form-control w-full max-w-xs mt-2">
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
        <span>SAT</span>
      </label>
    </div>
    <div class="form-control w-full max-w-xs mt-2">
      <label for="price" class="input-group my-4">
        Inventory: &nbsp;
        <input
          id="inventory"
          alt="inventory"
          type="number"
          placeholder="1"
          class="input input-bordered input-primary"
          bind:value={inventory}
          {disabled}
        />
      </label>
    </div>
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
