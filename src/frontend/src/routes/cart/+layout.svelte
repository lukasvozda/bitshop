<script>
  import {
    currentStep,
    Steps,
    validateShippingDetailsStep,
    validateProductsStep,
    productsInCart
  } from "@/stores/cart";
  import { createOrder } from "@/stores/orders";
  import { Steps as StepsComponent } from "svelte-steps";
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feathers";
  import { onMount } from "svelte";

  let steps = [];
  let loading = false;
  let orderId = "";

  onMount(() => {
    $currentStep = 0;
  });

  $: steps = [
    {
      disabled: !$validateProductsStep,
      onClick: () => ($currentStep = Steps.PRODUCTS),
      buttonText: "products",
      title: "Your items in cart"
    },
    {
      // disabled: !$validateShippingDetailsStep,
      onClick: () => ($currentStep = Steps.SHIPPING),
      buttonText: "shipping address",
      title: "Your shipping address"
    },
    {
      onClick: () => ($currentStep = Steps.PAYMENT),
      buttonText: "payment",
      title: "Your payment"
    },
    {
      onClick: async () => {
        loading = true;
        let result = await createOrder();
        if (result) {
          orderId = result.id;
          $currentStep = Steps.TRANSACTION_SET;
        }
        loading = false;
      },
      title: "Your transaction ID",
      buttonText: "I have paid"
    }
  ];
</script>

<section class="md:w-3/4 mx-7 md:mx-auto py-14">
  <h2
    class="pb-8 text-2xl font-semibold leading-none tracking-tight text-gray-700 md:text-4xl lg:text-5xl dark:text-white"
  >
    {steps[$currentStep].title}
  </h2>

  {#if $productsInCart.length === 0}
    <div class="text-gray-700 text-2xl text-center my-20">Your cart is empty.</div>
  {:else}
    <div class="w-full sm:w-1/2 sm:mx-auto my-10">
      <StepsComponent
        {steps}
        size="2.8rem"
        line="0.2rem"
        clickable={false}
        current={$currentStep}
        primary="rgb(55, 65, 81, 70)"
      />
    </div>

    <slot />

    <div class="flex mt-16">
      <div class="mr-auto">
        {#if $currentStep > Steps.PRODUCTS && $currentStep < Steps.TRANSACTION_SET}
          <button class="btn btn-lg gap-2 rounded-2xl" on:click={steps[$currentStep - 1].onClick}>
            <ArrowLeftIcon />
            {steps[$currentStep - 1].buttonText}
          </button>
        {/if}
      </div>
      <div class="ml-auto">
        {#if $currentStep < Steps.TRANSACTION_SET}
          <button
            disabled={steps[$currentStep].disabled}
            on:click={steps[$currentStep + 1].onClick}
            class="btn btn-lg rounded-2xl gap-2"
            class:loading
          >
            {steps[$currentStep + 1].buttonText}
            <ArrowRightIcon />
          </button>
        {/if}
      </div>
    </div>
  {/if}
</section>
