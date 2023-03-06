<script lang="ts">
  import { categories } from "@/stores/products";
  import type { UserCategory } from "@/types";
  import { field, form } from "svelte-forms";
  import { required } from "svelte-forms/validators";

  export let disabled: boolean;
  export let category: UserCategory;
  export let submitFunction;

  const formName = field("name", category.name, [required()]);
  const CategoryForm = form(formName);

  $: category.name = $formName.value;

  const isValidField = (invalid: boolean) =>
    invalid
      ? "invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500"
      : "";
</script>

<form on:submit|preventDefault={submitFunction}>
  <div class="form-control w-full my-4">
    <label for="title" class="block text-sm font-medium text-gray-700">Name: &nbsp;</label>
    <input
      id="name"
      alt="name"
      type="text"
      placeholder="Name"
      required
      class="input mt-1 input-md block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
        $CategoryForm.hasError('name.required')
      )}"
      bind:value={$formName.value}
      {disabled}
    />
    {#if $CategoryForm.hasError("name.required")}
      <span class="text-red-500 text-sm ml-1 mt-1"> Category name is required </span>
    {/if}
  </div>
  <div class="flex justify-end">
    {#if disabled === true}
      <button type="submit" class="btn my-4 loading ">Submit category</button>
    {:else}
      <button type="submit" class="btn my-4">Submit category</button>
    {/if}
  </div>
</form>
