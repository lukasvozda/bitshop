<script>
  import { currentStep, Steps, validateShippingDetailsStep } from "@/stores/shoppingCart/index.ts";
  import ShippingAddressForm from "@/lib/components/forms/ShippingAddressForm.svelte";
  import PaymentForm from "@/lib/components/forms/PaymentForm.svelte";
</script>

<div>
  <ul class="steps">
    <li data-content="1" class="step" class:step-primary={$currentStep >= Steps.PRODUCTS}>
      Products
    </li>
    <li data-content="2" class="step" class:step-primary={$currentStep >= Steps.SHIPPING}>
      Shipping details
    </li>
    <li data-content="3" class="step" class:step-primary={$currentStep >= Steps.PAYMENT}>
      Payment
    </li>
    <li data-content="4" class="step" class:step-primary={$currentStep >= Steps.CONFIRMATION}>
      Confirmation
    </li>
  </ul>

  <div>
    {#if $currentStep === Steps.PRODUCTS}
      <div>
        products in cart
        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex">
          <button
            on:click={() => ($currentStep = Steps.SHIPPING)}
            class="ml-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            go to shipping address
          </button>
        </div>
      </div>
    {:else if $currentStep === Steps.SHIPPING}
      <div>
        <ShippingAddressForm />
        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center">
          <button
            on:click={() => ($currentStep = Steps.PRODUCTS)}
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            go back to products
          </button>
          <button
            on:click={() => ($currentStep = Steps.PAYMENT)}
            class="ml-auto inline-flex justify-center disabled:bg-gray-300 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            continue to payment
          </button>
        </div>
      </div>
    {:else if $currentStep === Steps.PAYMENT}
      <div>
        <PaymentForm />
        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center">
          <button
            on:click={() => ($currentStep = Steps.SHIPPING)}
            class="mr-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            go back to shipping details
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
