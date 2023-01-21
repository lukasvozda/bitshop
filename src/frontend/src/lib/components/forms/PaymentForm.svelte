<script>
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import { alerts, createAlert } from "@/stores/alerts";
  import { STATUS } from "@/types";
  import { getNewPaymentAddress, paymentAddress } from "@/stores/payments";

  let QRCodeCanvas;

  const generateQRCode = (address) => {
    QRCode.toCanvas(QRCodeCanvas, address, (err) => {
      if (err) {
        console.log(err);
        alerts.update((alerts) => {
          alerts.push(createAlert(err, STATUS.ERROR));
          return alerts;
        });
      }
    });
  };

  onMount(async () => {
    let result = await getNewPaymentAddress();
    if (result) {
      generateQRCode(result);
    }
    console.log(result);
  });
</script>

<div>
  <div class="container">
    <canvas bind:this={QRCodeCanvas} />
    <div>{$paymentAddress}</div>
  </div>
</div>
