<script>
  import { currentStep, Steps } from "@/stores/cart";
  import ShippingAddressForm from "@/lib/components/forms/ShippingAddressForm.svelte";
  import PaymentForm from "@/lib/components/forms/PaymentForm.svelte";
  import ProductsForm from "@/lib/components/forms/ProductsForm.svelte";
  import Confirmation from "@/routes/cart/Confirmation.svelte";
</script>

<div>
  <div>
    {#if $currentStep === Steps.PRODUCTS}
      <ProductsForm />
    {:else if $currentStep === Steps.SHIPPING}
      <ShippingAddressForm />
    {:else if $currentStep === Steps.PAYMENT}
      <PaymentForm />
    {:else if $currentStep === Steps.CONFIRMATION}
      <Confirmation />
    {/if}
  </div>
</div>
