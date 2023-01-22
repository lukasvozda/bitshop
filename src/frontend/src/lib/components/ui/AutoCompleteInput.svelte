<script>
  import { ChevronDownIcon } from "svelte-feather-icons";

  export let items = [];
  export let filterMethod = (input, item) => item.startsWith(input);
  export let equalMethod = (input, item) => item === input;
  export let placeholder = "";
  export let disabled = false;
  export let fieldItem;

  let filteredItems = [];
  let inputElement; // for invoking invalid selector of the input

  const selectItem = (item) => {
    fieldItem.set(JSON.parse(JSON.stringify(item)));
    filteredItems = []; // hide options when selected
  };

  const setValidity = (selectedItem) => {
    if (selectedItem.invalid && inputElement) {
      inputElement.setCustomValidity("invalid");
    } else if (selectedItem.valid && Object.keys(selectedItem.value).length > 0 && inputElement) {
      inputElement.setCustomValidity("");
    }
  };

  $: setValidity($fieldItem);

  const filterItems = () => {
    filteredItems = [];
    if ("value" in $fieldItem && $fieldItem.value.name) {
      for (let item of items) {
        if (equalMethod($fieldItem.value, item)) {
          selectItem(item);
        } else if (filterMethod($fieldItem.value, item)) {
          filteredItems.push(item);
        }
        if (filteredItems.length > 4) {
          break;
        }
      }
    }
  };

  const isValidField = (invalid) => (invalid ? "invalid:border-red-500 invalid:text-red-500" : "");
</script>

<div class="dropdown w-full">
  <div class="relative max-w-xl">
    <input
      tabindex="0"
      type="text"
      {disabled}
      {placeholder}
      bind:value={$fieldItem.value.name}
      bind:this={inputElement}
      on:input={filterItems}
      class="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 focus:text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
        $fieldItem.invalid
      )}"
    />
    <div class="absolute right-0 inset-y-0 pr-3">
      <div class="pt-3"><ChevronDownIcon size="17" /></div>
    </div>
    {#if filteredItems.length > 0}
      <ul
        tabindex="0"
        class="z-40 absolute dropdown-content border-gray-500 menu p-2 shadow bg-white rounded-box w-full invisible peer-focus:visible hover:visible"
      >
        {#each filteredItems as item}
          <li on:click={() => selectItem(item)}>
            <a href="">
              <slot {item}>{item.name}</slot>
            </a>
          </li>
          <slot />
        {/each}
      </ul>
    {/if}
    {#if $fieldItem.invalid}
      <span class="text-red-500 text-sm ml-1 mt-1"> You must pick an item from the list </span>
    {/if}
  </div>
</div>
