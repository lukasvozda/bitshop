<script>
  import { currentStep } from "@/stores/cart";
  import ShippingAddressForm from "@/lib/components/cart/ShippingAddressStep.svelte";
  import PaymentStep from "@/lib/components/cart/PaymentStep.svelte";
  import ProductsStep from "@/lib/components/cart/ProductsStep.svelte";
  import TransactionIdStep from "@/lib/components/cart/TransactionIdStep.svelte";

  let componentSteps = [ProductsStep, ShippingAddressForm, PaymentStep, TransactionIdStep];
</script>

<div>
  <svelte:component this={componentSteps[$currentStep]} />
</div>
