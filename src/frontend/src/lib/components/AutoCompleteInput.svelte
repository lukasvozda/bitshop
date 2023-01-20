<script>
  import { ChevronDownIcon } from 'svelte-feather-icons';

  export let items = [];
  export let filterMethod = (input, item) => item.startsWith(input);
  export let placeholder = '';

  let filteredItems = [];
  let selectedItem = {};
  let focused = false;

  const selectItem = (item) => {
    selectedItem = JSON.parse(JSON.stringify(item));
    filteredItems = [];
  }

  const filterItems = () => {
    filteredItems = [];
    if (selectedItem) {
      for (let item of items) {
        if (filterMethod(selectedItem, item)) {
          filteredItems.push(item);
        }
        if (filteredItems.length > 5) {
          break;
        }
      }
    }
  }

</script>

<div class="dropdown w-full">
    <div class="relative max-w-xl">
        <input
            tabindex="0"
            type="text"
            placeholder={placeholder}
            bind:value={selectedItem.name}
            on:input={filterItems}
            on:focusin={() => focused = true}
            on:focusout={() => focused = false}
            class="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
        <span class="absolute right-0 inset-y-0 flex items-center pr-3">
            <ChevronDownIcon size="17"></ChevronDownIcon>
        </span>
        {#if filteredItems.length > 0}
            <ul tabindex="0" class="absolute dropdown-content border-gray-500 menu p-2 shadow bg-white rounded-box w-full invisible peer-focus:visible hover:visible">
                {#each filteredItems as item}
                    <li on:click={() => selectItem(item)} class="hover:bg-gray-200 rounded-md px-2 py-1">
                        <a href="">
                            <slot item={item}>{ item.name }</slot>
                        </a>
                    </li>
                    <slot></slot>
                {/each}
            </ul>
        {/if}
    </div>
</div>
