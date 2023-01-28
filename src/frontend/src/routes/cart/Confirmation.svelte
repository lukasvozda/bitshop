<script>
  import CountUpTimer from "@/lib/components/ui/CountUpTimer.svelte";
</script>

<div>
  Thank you for your order, we now need to verify your transaction. It might take up to 10 minutes.
</div>

Time elapsed since your payment
<CountUpTimer maximumElapsedSeconds={7200} />

Order summary: llll Order status:
