<script>
  import CountUpTimer from "@/lib/components/ui/CountUpTimer.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { alerts, alertVisibility } from "@/stores/alerts";
  import { Status, OrderStatus } from "@/lib/utils";
  import { Circle } from "svelte-loading-spinners";
  import { checkOrderVerified } from "@/stores/orders";
  import { CheckCircleIcon } from "svelte-feathers";
  import ClipboardCopy from "@/lib/components/ui/ClipboardCopy.svelte";

  let status = "";

  onMount(async () => {
    if ($page.params.orderId) {
      let checkInterval = setInterval(async () => {
        let result = await checkOrderVerified($page.params.orderId);
        // let result = { Verified: null };
        if (result) {
          if (OrderStatus.VERIFIED in result) {
            status = OrderStatus.VERIFIED;
            clearInterval(checkInterval);
          } else if (OrderStatus.USER_CONFIRMED_PAYMENT in result) {
            alerts.addAlert("User did not supply transaction ID. Unable to verify.", Status.ERROR);
            alertVisibility.showAlert();
            clearInterval(checkInterval);
          } else if (!(OrderStatus.TRANSACTION_ID_SET in result)) {
            alerts.addAlert("Transaction in unknown state.", Status.ERROR);
            status = OrderStatus.UNKNOWN;
            alertVisibility.showAlert();
            clearInterval(checkInterval);
          }
        } else {
          console.log(result);
          status = OrderStatus.UNKNOWN;
          clearInterval(checkInterval);
        }
      }, 0);
    } else {
      alerts.addAlert("Missing order ID", Status.ERROR);
      alertVisibility.showAlert();
    }
  });
</script>

<div class="mx-auto my-10 text-center flex flex-col items-center">
  {#if status === OrderStatus.VERIFIED}
    <div class="flex flex-col justify-center items-center my-20">
      <CheckCircleIcon size="100" class="text-success" />
      <h3 class="text-gray-700 font-bold text-4xl my-4">Thank for your purchase.</h3>
      <div class="text-gray-700 text-xl">Your transaction has been successfully verified.</div>
      <div class="text-gray-700 text-xl my-4">Your order ID is</div>
      <ClipboardCopy copyValue={$page.params.orderId} />
    </div>
  {:else if status === OrderStatus.TRANSACTION_ID_SET}
    <div class="my-10 text-lg">
      Thank you for your order, we now need to verify your transaction.<br /> It might take up to 10
      minutes.
    </div>
    <CountUpTimer maximumElapsedSeconds={7200} />
  {:else if status === OrderStatus.VERIFIED}
    <div class="my-10 text-lg">Transaction has been verified.</div>
  {:else if status === ""}
    <div class="my-20">
      <Circle color="black" size="100" duration="2s" />
    </div>
  {/if}
</div>
