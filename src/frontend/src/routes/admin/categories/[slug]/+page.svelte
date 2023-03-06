<script lang="ts">
  import { page } from "$app/stores";
  import { categories } from "@/stores/products";
  import type { Category, UserCategory } from "@/types";
  import CategoryForm from "@/lib/components/admin/CategoryForm.svelte";
  import GoBackButton from "@/lib/components/admin/GoBackButton.svelte";

  let category: UserCategory;
  let categoryList: [string, Category][] = $categories;
  let disabled: boolean = false;
  let categoryId: string = "";

  $: {
    categoryId = $page.params.slug;
    let item = categoryList.find((c) => c[0] === categoryId);
    if (item) {
      category = item[1];
    }
  }

  const updateCategory = async () => {
    disabled = true;
    await categories.updateCategory($page.params.slug, category.name);
    disabled = false;
  };

  const deleteCategory = async () => {
    if (confirm("Are you sure to delete this category?")) {
      disabled = true;
      let res = await categories.deleteCategory(categoryId);
      if (res) {
        // if category was deteled, clear it in the front-end
        category = null;
      }
      disabled = false;
    }
  };
</script>

{#if category}
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Category detail: {category.name}</h1>
    </div>
    <div class="ml-auto">
      <GoBackButton />
    </div>
  </div>
  <CategoryForm {disabled} {category} submitFunction={updateCategory} />
  <div class="flex justify-end">
    {#if disabled === true}
      <button type="button" class="btn btn-warning my-4 loading" on:click={deleteCategory}>
        Delete category
      </button>
    {:else}
      <button type="button" class="btn btn-warning my-4 " on:click={deleteCategory}>
        Delete category
      </button>
    {/if}
  </div>
{:else}
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Category detail</h1>
    </div>
    <div class="ml-auto">
      <GoBackButton />
    </div>
  </div>
  <div>Category was deleted or not found.</div>
{/if}
