<script>
  import {
    currentStep,
    Steps,
    validateShippingDetailsStep,
    validateProductsStep
  } from "@/stores/cart/index.ts";
  import ShippingAddressForm from "@/lib/components/forms/ShippingAddressForm.svelte";
  import PaymentForm from "@/lib/components/forms/PaymentForm.svelte";
  import ProductsForm from "@/lib/components/forms/ProductsForm.svelte";
  import Confirmation from "@/routes/cart/Confirmation.svelte";
</script>

<div>
  <div>
    {#if $currentStep === Steps.PRODUCTS}
      <div>
        <ProductsForm />
      </div>
    {:else if $currentStep === Steps.SHIPPING}
      <ShippingAddressForm />
    {:else if $currentStep === Steps.PAYMENT}
      <div>
        <PaymentForm on:userConfirmed={() => ($currentStep = Steps.CONFIRMATION)} />
        <!--        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center">-->
        <!--          <button-->
        <!--            on:click={() => ($currentStep = Steps.SHIPPING)}-->
        <!--            class="mr-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"-->
        <!--          >-->
        <!--            go back to shipping details-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    {:else if $currentStep === Steps.CONFIRMATION}
      <div>bla</div>
    {/if}
  </div>
</div>
