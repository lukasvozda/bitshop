<script>
  import { currentStep } from "@/stores/cart";
  import ShippingAddressForm from "@/lib/components/cart/ShippingAddressStep.svelte";
  import PaymentForm from "@/lib/components/cart/PaymentStep.svelte";
  import ProductsForm from "@/lib/components/cart/ProductsStep.svelte";

  let componentSteps = [ProductsForm, ShippingAddressForm, PaymentForm];
</script>

<div>
  <svelte:component this={componentSteps[$currentStep]} />
</div>
