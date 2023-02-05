<script>
  import { CopyIcon } from "svelte-feather-icons";

  export let copyValue = "";

  let copiedToClipBoard = false;

  const copyToClipBoard = async () => {
    navigator.clipboard.writeText(copyValue).then(() => {
      copiedToClipBoard = true;
      setTimeout(() => (copiedToClipBoard = false), 400);
    });
  };
</script>

<div
  class:custom-tooltip-open={copiedToClipBoard}
  class="tooltip tooltip-bottom tooltip-open w-full"
  data-tip="copied to clipboard"
>
  <div
    on:click={() => copyToClipBoard()}
    class="border border-gray-700 rounded-3xl text-xs sm:text-xl font-mono px-5 py-2 cursor-pointer flex items-center"
  >
    <span class="mr-2">{copyValue}</span>
    <slot />
    <CopyIcon size="16" class="ml-auto" />
  </div>
</div>

<style>
  .tooltip.tooltip-open:before,
  .tooltip.tooltip-open:after {
    opacity: 0;
    transition: 0.5s;
  }
  .tooltip.custom-tooltip-open:before,
  .tooltip.custom-tooltip-open:after {
    opacity: 1;
  }
</style>
