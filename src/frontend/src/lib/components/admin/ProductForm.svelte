<script lang="ts">
  import { categories } from "@/stores/products";
  import type { UserProduct } from "@/types";
  import { field, form } from "svelte-forms";
  import { required, min } from "svelte-forms/validators";

  export let disabled: boolean;
  export let product: UserProduct;
  export let submitFunction;

  const formTitle = field("title", product.title, [required()]);
  const formDescription = field("description", product.description, []);
  const formCategory = field("category", product.category, [required()]);
  const formPrice = field("price", product.price, [required(), min(1)]);
  const formInventory = field("inventory", product.inventory, [required()]);
  const formActive = field("active", product.active, []);
  const productForm = form(
    formTitle,
    formDescription,
    formCategory,
    formPrice,
    formInventory,
    formActive
  );

  $: product.title = $formTitle.value;
  $: product.description = $formDescription.value;
  $: product.category = $formCategory.value;
  $: product.price = $formPrice.value;
  $: product.inventory = $formInventory.value;
  $: product.active = $formActive.value;

  const isValidField = (invalid) =>
    invalid
      ? "invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500"
      : "";
</script>

{#if product}
  <form on:submit|preventDefault={submitFunction}>
    <div class="form-control w-full my-4">
      <label for="title" class="block text-sm font-medium text-gray-700">Title: &nbsp;</label>
      <input
        id="title"
        alt="title"
        type="text"
        placeholder="Title"
        required
        class="input mt-1 input-md block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
          $productForm.hasError('title.required')
        )}"
        bind:value={$formTitle.value}
        {disabled}
      />
      {#if $productForm.hasError("title.required")}
        <span class="text-red-500 text-sm ml-1 mt-1"> Product title is required </span>
      {/if}
    </div>
    <div class="form-control w-full my-4">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description: &nbsp;</label
      >
      <textarea
        class="textarea mt-1 input-md block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Description"
        bind:value={$formDescription.value}
        {disabled}
      />
    </div>
    <div class="form-control w-full my-4">
      <label for="Category" class="block text-sm font-medium text-gray-700">Category: &nbsp;</label>
      <select
        class="select  w-full mt-1 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
          $productForm.hasError('category.required')
        )}"
        bind:value={$formCategory.value}
        {disabled}
      >
        <option value="default" disabled selected>Select category</option>
        {#each $categories as c}
          <option value={c[0]}>{c[1].name}</option>
        {/each}
      </select>
      {#if $productForm.hasError("category.required")}
        <span class="text-red-500 text-sm ml-1 mt-1"> Category is required </span>
      {/if}
    </div>
    <div class="form-control w-full my-4">
      <label for="price" class="text-sm font-medium text-gray-700">
        Price (Satoshi): &nbsp;
        <input
          id="price"
          alt="price"
          type="number"
          placeholder="1"
          min="1"
          required
          class="input mt-1 input-md block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
            $productForm.hasError('price.required') || $productForm.hasError('price.min')
          )}"
          bind:value={$formPrice.value}
          {disabled}
        />
      </label>
      {#if $productForm.hasError("price.required")}
        <span class="text-red-500 text-sm ml-1 mt-1"> Price is required</span>
      {/if}
      {#if $productForm.hasError("price.min")}
        <span class="text-red-500 text-sm ml-1 mt-1"> Minimum price is 1</span>
      {/if}      
    </div>
    <div class="form-control w-full my-4">
      <label for="inventory" class="block text-sm font-medium text-gray-700">
        Inventory: &nbsp;
        <input
          id="inventory"
          alt="inventory"
          type="number"
          placeholder="1"
          min="1"
          required
          class="input mt-1 input-md block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
            $productForm.hasError('inventory.required')
          )}"
          bind:value={$formInventory.value}
          {disabled}
        />
      </label>
      {#if $productForm.hasError("inventory.required")}
        <span class="text-red-500 text-sm ml-1 mt-1"> Price is required </span>
      {/if}
    </div>
    <div class="form-control w-full my-4">
      <label for="image" class="label block text-sm font-medium text-gray-700">
        <span class="label-text">Image (not done yet):</span>
      </label>
      <input
        type="file"
        id="image"
        class="file-input file-input-bordered w-full border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {disabled}
      />
    </div>
    <div class="form-control my-4 max-w-0">
      <label class="label cursor-pointer">
        <span class="label-text mr-2">Active:</span>
        <input
          type="checkbox"
          class="toggle toggle-info"
          bind:checked={$formActive.value}
          {disabled}
        />
      </label>
    </div>
    {#if disabled === true}
      <button type="submit" class="btn my-4 loading ">Submit product</button>
    {:else}
      <button type="submit" class="btn my-4">Submit product</button>
    {/if}
  </form>
{/if}
