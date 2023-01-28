<script>
  import {
    currentStep,
    Steps,
    validateShippingDetailsStep,
    validateProductsStep
  } from "@/stores/cart/index.ts";

  const stepButtons = [
    {
      disabled: !$validateProductsStep,
      onClick: () => ($currentStep = Steps.SHIPPING),
      text: "go to shipping address"
    },
    {
      disabled: !$validateShippingDetailsStep,
      onClick: () => ($currentStep = Steps.PAYMENT),
      text: "continue to payment"
    }
  ];
</script>

<div class="container mx-auto my-9">
  <h2
    class="mb-4 text-2xl font-semibold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
  >
    Your items in cart
  </h2>
  <slot />

  <div class="grid grid-cols-4 ">
    <div class="mr-auto">
      {#if $currentStep > Steps.PRODUCTS}
        <button on:click={stepButtons[$currentStep - 1].onClick}>
          {stepButtons[$currentStep - 1].text}
        </button>
      {/if}
    </div>

    <ul class="steps col-span-2">
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

    <div class="ml-auto">
      {#if $currentStep < Steps.PAYMENT}
        <button
          disabled={stepButtons[$currentStep].disabled}
          on:click={stepButtons[$currentStep].onClick}
          class="btn"
        >
          {stepButtons[$currentStep].text}
        </button>
      {/if}
    </div>
  </div>
</div>
