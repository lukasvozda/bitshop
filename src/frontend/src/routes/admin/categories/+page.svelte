<script>
  import { actor } from "@/stores";
  import { categories } from "@/stores/products";

  let disabled = false;
  let name = "";

  // This will later be in the admin section
  const submitCategory = async () => {
    disabled = true;
    let category = {
      name: name
    };
    let res = await $actor.createCategory(name);
    // TODO handle errors
    console.log(res);

    if ("ok" in res) {
      console.log("updating store");

      // We are guessing product ID and don't know a slug, maybe better off to pull data from the backend again
      var size = $categories.length;
      $categories = [...$categories, [toString(size), category]];
    }
    disabled = false;
  };
</script>

<section class="ml-4 w-5/6 md:w-3/4">
  <h1 class="my-4">Categories</h1>
  <form on:submit|preventDefault={submitCategory}>
    <div class="form-control w-full max-w-xs mt-2">
      <label for="name">Name: &nbsp;</label>
      <input
        id="name"
        alt="name"
        type="text"
        placeholder="name"
        class="input input-bordered input-primary w-full max-w-xs"
        bind:value={name}
        {disabled}
      />
    </div>
    {#if disabled === true}
      <button type="submit" class="btn btn-primary my-4 loading ">Create category</button>
    {:else}
      <button type="submit" class="btn btn-primary my-4">Create category</button>
    {/if}
  </form>
</section>
