<script>
  import {
    currentStep,
    Steps,
    validateShippingDetailsStep,
    validateProductsStep
  } from "@/stores/cart/index.ts";
  import { Steps as StepsComponent } from "svelte-steps";
  import {
    ShoppingCartIcon,
    HomeIcon,
    CreditCardIcon,
    CheckCircleIcon
  } from "svelte-feather-icons";

  let steps = [];

  $: steps = [
    {
      disabled: !$validateProductsStep,
      onClick: () => ($currentStep = Steps.SHIPPING),
      buttonText: "go to shipping address",
      icon: ShoppingCartIcon
    },
    {
      disabled: !$validateShippingDetailsStep,
      onClick: () => ($currentStep = Steps.PAYMENT),
      buttonText: "continue to payment",
      icon: HomeIcon
    },
    {
      icon: CreditCardIcon
    },
    {
      icon: CheckCircleIcon
    }
  ];
</script>

<div class="container mx-auto my-9">
  <h2
    class="mb-4 text-2xl font-semibold leading-none tracking-tight text-gray-700 md:text-4xl lg:text-5xl dark:text-white"
  >
    Your items in cart
  </h2>
  <slot />

  <div class="grid grid-cols-4 ">
    <div class="mr-auto">
      {#if $currentStep > Steps.PRODUCTS}
        <button on:click={steps[$currentStep - 1].onClick}>
          {steps[$currentStep - 1].text}
        </button>
      {/if}
    </div>

    <div class="col-span-2">
      <StepsComponent
        {steps}
        size="3rem"
        line="0.1rem"
        clickable={false}
        current={$currentStep}
        primary="rgb(55, 65, 81, 70)"
      />
    </div>

    {$currentStep}

    <div class="ml-auto">
      {#if $currentStep < Steps.PAYMENT}
        <button
          disabled={steps[$currentStep].disabled}
          on:click={steps[$currentStep].onClick}
          class="btn"
        >
          {steps[$currentStep].buttonText}
        </button>
      {/if}
    </div>
  </div>
</div>
