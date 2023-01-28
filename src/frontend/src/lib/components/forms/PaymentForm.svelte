<script>
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import { delayedAlert } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { getNewPaymentAddress, paymentAddress, callTestNoOp } from "@/stores/payments";
  import { Circle2 } from "svelte-loading-spinners";

  let QRCodeCanvas;
  let unableToLoad = false;

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
    <button class="btn btn-primary" on:click={() => callTestNoOp()}>I call no-op, click me</button>
  </div>
{:else if !unableToLoad}
  <Circle2 size="60" unit="px" />
{/if}
