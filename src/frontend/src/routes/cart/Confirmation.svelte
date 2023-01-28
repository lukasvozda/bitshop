<script>
  import CountUpTimer from "@/lib/components/ui/CountUpTimer.svelte";
</script>

<div class="mx-auto my-10 text-center flex flex-col items-center">
  <div class="my-10 text-lg">
    Thank you for your order, we now need to verify your transaction.<br /> It might take up to 10 minutes.
    We will send your an email when completed.
  </div>
  <CountUpTimer maximumElapsedSeconds={7200} />
</div>
