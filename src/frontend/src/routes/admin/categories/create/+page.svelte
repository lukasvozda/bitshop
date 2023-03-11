<script lang="ts">
  import { categories } from "@/stores/products";
  import type { Category, UserCategory } from "@/types";
  import CategoryForm from "@/lib/components/admin/CategoryForm.svelte";
  import GoBackButton from "@/lib/components/admin/GoBackButton.svelte";

  let disabled: boolean = false;
  let category: UserCategory = {
    name: ""
  };
  let created: boolean = false;
  let newCategory: Category;

  const createCategory = async () => {
    disabled = true;
    console.log("create category", category.name);
    let res = await categories.createCategory(category.name);
    if (res.slug != "") {
      created = true;
      newCategory = res;
    }
    disabled = false;
  };
</script>

<div class="flex my-4">
  <div class="mr-auto">
    <h1>Create category</h1>
  </div>
  <div class="ml-auto">
    <GoBackButton />
  </div>
</div>
{#if !created}
  <CategoryForm {disabled} {category} submitFunction={createCategory} />
{:else}
  <div>
    Category was created. You can edit it here: <a
      href="/admin/categories/{newCategory.slug}"
      class="link">{newCategory.name}</a
    >
  </div>
{/if}
