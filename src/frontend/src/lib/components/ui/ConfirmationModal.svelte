<script>
  export let isOpen = false;
  export const confirmCallback = () => (isOpen = false);
  export let title = "";
  export let displayCancel = true;
  export let displayConfirm = true;
</script>

<div class="modal" class:modal-open={isOpen}>
  <div class="modal-box">
    <div class="font-bold text-lg">{title}</div>
    <div>
      <slot />
    </div>
    <div class="modal-action flex">
      {#if displayCancel}
        <button class="btn rounded-xl" on:click={() => (isOpen = false)}>cancel</button>
      {/if}
      {#if displayConfirm}
        <button
          class="btn rounded-xl ml-auto"
          on:click={() => {
            confirmCallback();
            isOpen = false;
          }}
        >
          confirm
        </button>
      {/if}
    </div>
  </div>
</div>
