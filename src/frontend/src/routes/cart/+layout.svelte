<script>
  import { navigating } from "$app/stores";
  import { currentStep, Steps } from "@/stores/cart";

  $: if ($navigating) currentStep.set(Steps.PRODUCTS);
</script>

<h2>Cart page</h2>
TODO
<a class="link link-primary" href="#">Cart</a>
<a class="link link-primary" href="#">Personal details</a>
<a class="link link-primary" href="#">Checkout</a>

<div class="divider" />

<ul class="steps">
  <li data-content="1" class="step" class:step-primary={$currentStep >= Steps.PRODUCTS}>
    Products
  </li>
  <li data-content="2" class="step" class:step-primary={$currentStep >= Steps.SHIPPING}>
    Shipping details
  </li>
  <li data-content="3" class="step" class:step-primary={$currentStep >= Steps.PAYMENT}>Payment</li>
  <li data-content="4" class="step" class:step-primary={$currentStep >= Steps.CONFIRMATION}>
    Confirmation
  </li>
</ul>

<slot />
