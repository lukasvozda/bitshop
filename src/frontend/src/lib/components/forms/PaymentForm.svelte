<script>
  import { onMount, createEventDispatcher } from "svelte";
  import QRCode from "qrcode";
  import { delayedAlert } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { getNewPaymentAddress, paymentAddress } from "@/stores/payments";
  import { Circle2 } from "svelte-loading-spinners";

  let QRCodeCanvas;
  let unableToLoad = false;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    const timeout = delayedAlert(
      "Unable to fetch payment address. Contact us.",
      Status.ERROR,
      5000
    );
    let address = await getNewPaymentAddress();
    if (address) {
      clearTimeout(timeout);
      QRCode.toCanvas(QRCodeCanvas, address);
    } else {
      unableToLoad = true;
    }
  });
</script>

{#if $paymentAddress && !unableToLoad}
  <div>
    <div class="container">
      <canvas bind:this={QRCodeCanvas} />
      <div>{$paymentAddress}</div>
    </div>
    <button class="btn btn-primary" on:click={() => dispatch("userConfirmed")}>confirm</button>
  </div>
{:else if !unableToLoad}
  <Circle2 size="60" color="#FF3E00" unit="px" duration="1s" />
{/if}
