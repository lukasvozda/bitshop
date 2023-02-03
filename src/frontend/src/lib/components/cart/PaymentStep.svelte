<script>
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { delayedAlert } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { Circle } from "svelte-loading-spinners";
  import { Btc } from "svelte-cryptoicon";
  import { totalPrice, paymentAddress } from "@/stores/cart";
  import ClipboardCopy from "@/lib/components/ui/ClipboardCopy.svelte";

  let unableToLoad = false;

  onMount(async () => {
    scrollTo(0, 0);
    if (!$paymentAddress) {
      const timeout = delayedAlert(
        "Unable to fetch payment address. Contact us.",
        Status.ERROR,
        5000
      );
      await paymentAddress.getNewPaymentAddress();
      if ($paymentAddress) {
        clearTimeout(timeout);
      } else {
        unableToLoad = true;
      }
    }
  });
</script>

<div class="mx-auto">
  {#if $paymentAddress && !unableToLoad}
    <div class="flex flex-col items-center">
      <QRCodeImage
        text={$paymentAddress}
        displayStyle="border-style: dotted;"
        width="400"
        displayWidth="300"
      />
      <div>
        <div class="grid grid-cols-4 items-center">
          <div class="text-gray-700 text-xl mr-3 col-span-1">Unique address</div>
          <ClipboardCopy copyValue={$paymentAddress} />
        </div>
        <div class="grid grid-cols-4 items-center mt-5">
          <span class="text-gray-700 text-xl mr-3 col-span-1">Total amount</span>
          <ClipboardCopy copyValue={$totalPrice}>
            <Btc color="black" size="20" />
          </ClipboardCopy>
        </div>
      </div>
    </div>
  {:else if !unableToLoad}
    <div class="flex items-center justify-center my-24">
      <Circle size="100" color="gray" />
    </div>
  {/if}
</div>
