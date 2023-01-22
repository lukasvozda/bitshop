<script>
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import { alerts } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { getNewPaymentAddress, paymentAddress, callTestNoOp } from "@/stores/payments";
  import { Circle2 } from "svelte-loading-spinners";

  let QRCodeCanvas;

  const generateQRCode = (address) => {
    QRCode.toCanvas(QRCodeCanvas, address, (err) => {
      if (err) {
        alerts.addAlert(err, Status.ERROR);
      }
    });
  };

  onMount(async () => {
    let result = await getNewPaymentAddress();
    if (result) {
      generateQRCode(result);
    }
  });
</script>

{#if $paymentAddress}
  <div>
    <div class="container">
      <canvas bind:this={QRCodeCanvas} />
      <div>{$paymentAddress}</div>
    </div>
    <button class="btn btn-primary" on:click={callTestNoOp()}>I call no-op, click me</button>
  </div>
{:else}
  <Circle2 size="60" color="#FF3E00" unit="px" duration="1s" />
{/if}
