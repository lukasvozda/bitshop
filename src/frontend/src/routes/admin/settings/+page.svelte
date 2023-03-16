<script lang="ts">
  import { getOwnerXPUB, setOwnerXPUB } from "@/stores/admin";
  import { onMount } from "svelte";
  import { field, form } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import { Circle } from "svelte-loading-spinners";

  let disabled: boolean;

  const XPUBValue = field("xpub", null, [required()]);
  const XPUBForm = form(XPUBValue);

  const setXPUB = async () => {
    disabled = true;
    await setOwnerXPUB($XPUBValue.value);
    disabled = false;
  };

  const isValidField = (invalid: boolean) =>
    invalid
      ? "invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500"
      : "";

  onMount(async () => {
    $XPUBValue.value = await getOwnerXPUB();
  });
</script>

<div class="flex my-4">
  <h1>Settings</h1>
</div>

<div>
  <div class="flex flex-wrap">
    {#if !$XPUBValue.value}
      <div class="flex w-full items-center justify-center my-24">
        <Circle size="100" color="gray" />
      </div>
    {:else}
      <div class="w-full">
        <div class="my-5">
          Set your wallet's extended child public key (hardened). This key shall be used for
          deriving subsequent child keys for orders, one per order. Without it, this app shall not
          work properly. The address gap limit in your wallet might have to be set to its maximum
          value in order to see all received transactions.
        </div>
        <form on:submit|preventDefault={setXPUB}>
          <div class="form-control w-full my-4">
            <textarea
              id="name"
              alt="name"
              type="text"
              style="--height: auto"
              required
              class="textarea textarea-lg textarea-bordered mt-1 block w-full rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                $XPUBForm.hasError('xpub.required')
              )}"
              bind:value={$XPUBValue.value}
              {disabled}
            />
            {#if $XPUBForm.hasError("name.required")}
              <span class="text-red-500 text-sm ml-1 mt-1">XPUB is required</span>
            {/if}
          </div>
          <div class="flex justify-end">
            <button
              disabled={!$XPUBForm.valid}
              type="submit"
              class="btn my-4"
              class:loading={disabled}
            >
              Submit public key
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
