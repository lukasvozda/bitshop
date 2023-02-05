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
  let timeout = false;

  const checkOrder = async () => {
    let result = await checkOrderVerified($page.params.orderId);
    if (result) {
      if (OrderStatus.VERIFIED in result) {
        return OrderStatus.VERIFIED;
      } else if (OrderStatus.TRANSACTION_ID_SET in result) {
        return OrderStatus.TRANSACTION_ID_SET;
      } else if (OrderStatus.USER_CONFIRMED_PAYMENT in result) {
        throw "User did not supply transaction ID. Unable to verify payment.";
      } else {
        throw "Transaction exists, but it is in unknown state.";
      }
    }
  };

  onMount(async () => {
    if ($page.params.orderId) {
      try {
        status = await checkOrder();
        if (status !== OrderStatus.VERIFIED) {
          let tryCounter = 0;
          let checkInterval = setInterval(async () => {
            if (tryCounter < 100) {
              tryCounter++;
              status = await checkOrder();
              if (status === OrderStatus.VERIFIED) {
                clearInterval(checkInterval);
              }
            } else {
              timeout = true;
              clearInterval(checkInterval);
              throw "Timeout while verifying payment.";
            }
          }, 20000);
        }
      } catch (err) {
        alerts.addAlert(err, Status.ERROR);
        alertVisibility.showAlert();
      }
    } else {
      alerts.addAlert("Missing order ID", Status.ERROR);
      alertVisibility.showAlert();
    }
  });
</script>

<div
  class="w-5/6 md:w-3/4 mx-auto px-4 sm:px-0 mx-auto my-10 text-center flex flex-col items-center"
>
  {#if status === OrderStatus.VERIFIED}
    <div class="flex flex-col justify-center items-center my-20">
      <CheckCircleIcon size="100" class="text-success" />
      <h3 class="text-gray-700 font-bold text-4xl my-4">Thank for your purchase.</h3>
      <div class="text-gray-700 text-xl">Your transaction has been successfully verified.</div>
      <div class="text-gray-700 text-xl my-4">Your order ID is</div>
      <ClipboardCopy copyValue={$page.params.orderId} />
    </div>
  {:else if status === OrderStatus.TRANSACTION_ID_SET}
    <div class="my-10 text-xl">
      <div class="text-gray-700 font-bold text-3xl">Thank you for your order.</div>
      <div>We now need to verify your transaction.</div>
      <div>It might take up to 10 minutes.</div>
    </div>
    <CountUpTimer maximumElapsedSeconds={7200} />
  {:else if status === "" && !timeout}
    <div class="my-20">
      <Circle color="black" size="100" duration="2s" />
    </div>
  {/if}
</div>
