<script>
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { delayedAlert } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { Circle } from "svelte-loading-spinners";
  import { CopyIcon } from "svelte-feather-icons";
  import { Btc } from "svelte-cryptoicon";
  import { totalPrice, paymentAddress } from "@/stores/cart";

  let copiedToClipBoard = "";
  let unableToLoad = false;

  const copyToClipBoard = async (inputType, input) => {
    navigator.clipboard.writeText(input).then(() => {
      copiedToClipBoard = inputType;
      setTimeout(() => (copiedToClipBoard = ""), 400);
    });
  };

  onMount(async () => {
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
          <div
            class:custom-tooltip-open={copiedToClipBoard === "address"}
            class="tooltip tooltip-right tooltip-open col-span-3"
            data-tip="copied address do clipboard"
          >
            <div
              on:click={() => copyToClipBoard("address", $paymentAddress)}
              class="border border-gray-700 rounded-3xl text-xl font-mono px-5 py-2 cursor-pointer flex items-center"
            >
              <span class="mr-2">{$paymentAddress}</span>
              <CopyIcon size="16" class="ml-auto" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 items-center mt-5">
          <span class="text-gray-700 text-xl mr-3 col-span-1">Total amount</span>
          <div
            class:custom-tooltip-open={copiedToClipBoard === "price"}
            class="tooltip tooltip-right tooltip-open col-span-3"
            data-tip="copied price do clipboard"
          >
            <div
              on:click={() => copyToClipBoard("price", $totalPrice)}
              class="border border-gray-700 rounded-3xl text-xl font-mono px-5 py-2 cursor-pointer flex items-center"
            >
              <span class="mr-2">{$totalPrice}</span>
              <Btc size="20" />
              <CopyIcon size="16" class="ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if !unableToLoad}
    <div class="flex items-center justify-center my-24">
      <Circle size="100" color="gray" />
    </div>
  {/if}
</div>

<style>
  .tooltip.tooltip-open:before,
  .tooltip.tooltip-open:after {
    opacity: 0;
    transition: 0.5s;
  }
  .tooltip.custom-tooltip-open:before,
  .tooltip.custom-tooltip-open:after {
    opacity: 1;
  }
</style>
