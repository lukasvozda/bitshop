<script>
  import CountUpTimer from "@/lib/components/ui/CountUpTimer.svelte";
  import { page } from "$app/stores";
  import { validateOrderTransactionFinished } from "@/stores/orders";
  import { onMount } from "svelte";
  import { alerts } from "@/stores/alerts";
  import { Status, OrderStatus } from "@/lib/utils";

  let status = OrderStatus.USER_CONFIRMED_PAYMENT;

  onMount(async () => {
    if ($page.params.orderId) {
      let checkInterval = setInterval(async () => {
        let result = await validateOrderTransactionFinished($page.params.orderId);
        if (result) {
          if (OrderStatus.TRANSACTION_CONFIRMED in result) {
            status = OrderStatus.TRANSACTION_CONFIRMED;
            clearInterval(checkInterval);
          }
        } else {
          clearInterval(checkInterval);
        }
      }, 5000);
    } else {
      alerts.addAlert("Missing order ID", Status.ERROR);
    }
  });
</script>

<div class="mx-auto my-10 text-center flex flex-col items-center">
  {#if status === OrderStatus.USER_CONFIRMED_PAYMENT}
    <div class="my-10 text-lg">
      Thank you for your order, we now need to verify your transaction.<br /> It might take up to 10
      minutes.
    </div>
    <CountUpTimer maximumElapsedSeconds={7200} />
  {:else if status === OrderStatus.TRANSACTION_CONFIRMED}
    <div class="my-10 text-lg">Transaction has been verified.</div>
  {/if}
</div>
