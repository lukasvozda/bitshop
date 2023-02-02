<script>
  import {
    currentStep,
    Steps,
    validateShippingDetailsStep,
    validateProductsStep,
    clearCart
  } from "@/stores/cart";
  import { createOrder } from "@/stores/orders";
  import { Steps as StepsComponent } from "svelte-steps";
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feathers";
  import { navigating } from "$app/stores";
  import { goto } from "$app/navigation";

  $: if ($navigating) {
    $currentStep = 0;
  }

  let steps = [];

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
        let result = await createOrder();
        if (result) {
          await goto(`/orders/${result.id}`, { replaceState: true });
          clearCart();
        }
      },
      title: "Your order confirmation",
      buttonText: "I have paid"
    }
  ];
</script>

<section class="w-5/6 md:w-3/4 mx-auto py-14">
  <h2
    class="pb-8 text-2xl font-semibold leading-none tracking-tight text-gray-700 md:text-4xl lg:text-5xl dark:text-white"
  >
    {steps[$currentStep].title}
  </h2>

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
      {#if $currentStep > Steps.PRODUCTS && $currentStep < Steps.CONFIRMATION}
        <button class="btn btn-lg gap-2 rounded-2xl" on:click={steps[$currentStep - 1].onClick}>
          <ArrowLeftIcon />
          {steps[$currentStep - 1].buttonText}
        </button>
      {/if}
    </div>
    <div class="ml-auto">
      {#if $currentStep < Steps.CONFIRMATION}
        <button
          disabled={steps[$currentStep].disabled}
          on:click={steps[$currentStep + 1].onClick}
          class="btn btn-lg rounded-2xl gap-2"
        >
          {steps[$currentStep + 1].buttonText}
          <ArrowRightIcon />
        </button>
      {/if}
    </div>
  </div>
</section>
