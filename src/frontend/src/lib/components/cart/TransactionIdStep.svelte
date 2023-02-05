<script>
  import { required } from "svelte-forms/validators";
  import { field, form } from "svelte-forms";
  import { goto } from "$app/navigation";
  import { clearCart, paymentAddress } from "@/stores/cart";
  import { setUserInputTransactionId } from "@/stores/orders";
  import { onMount } from "svelte";

  const formTransactionId = field("transactionId", "", [required()]);
  const transactionForm = form(formTransactionId);

  let loading = false;

  const confirm = async () => {
    loading = true;
    let orderId = await setUserInputTransactionId($paymentAddress, $formTransactionId.value);
    if (orderId) {
      await goto(`/transactions/${orderId}`, { replaceState: true });
      clearCart();
    }
    loading = false;
  };

  const isValidField = (invalid) =>
    invalid
      ? "invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500"
      : "";

  onMount(() => {
    scrollTo(0, 0);
  });
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-gray-700 text-lg sm:text-2xl mt-4 mb-10">
    <div>Input your payment transaction ID.</div>
    <div class="text-error">You will not be able to do so again.</div>
  </div>
  <div class="w-full lg:w-2/3">
    <input
      required
      type="text"
      bind:value={$formTransactionId.value}
      placeholder="Transaction ID"
      class="mt-1 font-mono rounded-3xl text-xs sm:text-2xl block w-full input-md border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
        $transactionForm.hasError('transactionId.required')
      )}"
    />
    {#if $transactionForm.hasError("transactionId.required")}
      <span class="text-red-500 text-sm ml-1 mt-1"> Transaction ID is required </span>
    {/if}
  </div>
  <button
    class="btn btn-lg rounded-xl mt-10"
    disabled={$transactionForm.hasError("transactionId.required") ||
      $formTransactionId.value.length === 0}
    class:loading
    on:click={() => confirm()}
  >
    confirm your transaction
  </button>
</div>
