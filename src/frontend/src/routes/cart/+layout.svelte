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
  import { navigating } from "$app/stores";

  $: if ($navigating) {
    $currentStep = 0;
  }

  let steps = [];

  $: steps = [
    {
      disabled: !$validateProductsStep,
      onClick: () => ($currentStep = Steps.PRODUCTS),
      buttonText: "products",
      icon: ShoppingCartIcon,
      title: "Your items in cart"
    },
    {
      // disabled: !$validateShippingDetailsStep,
      onClick: () => ($currentStep = Steps.SHIPPING),
      buttonText: "shipping address",
      icon: HomeIcon,
      title: "Your shipping address"
    },
    {
      onClick: () => ($currentStep = Steps.PAYMENT),
      icon: CreditCardIcon,
      buttonText: "payment",
      title: "Your payment"
    },
    {
      onClick: () => ($currentStep = Steps.CONFIRMATION),
      icon: CheckCircleIcon,
      title: "Your order confirmation",
      buttonText: "I confirm that I have paid"
    }
  ];
</script>

<div class="container mx-auto my-9">
  <h2
    class="mb-4 text-2xl font-semibold leading-none tracking-tight text-gray-700 md:text-4xl lg:text-5xl dark:text-white"
  >
    {steps[$currentStep].title}
  </h2>
  <slot />

  <div class="grid grid-cols-4 mt-20">
    <div class="mr-auto">
      {#if $currentStep > Steps.PRODUCTS && $currentStep < Steps.CONFIRMATION}
        <button class="btn" on:click={steps[$currentStep - 1].onClick}>
          go back to {steps[$currentStep - 1].buttonText}
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

    <div class="ml-auto">
      {#if $currentStep < Steps.CONFIRMATION}
        <button
          disabled={steps[$currentStep].disabled}
          on:click={steps[$currentStep + 1].onClick}
          class="btn btn-primary"
        >
          {$currentStep < Steps.PAYMENT ? "continue to" : ""}
          {steps[$currentStep + 1].buttonText}
        </button>
      {/if}
    </div>
  </div>
</div>
