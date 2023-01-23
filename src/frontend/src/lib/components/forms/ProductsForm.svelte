<script>
  import { productsInCart, totalPrice } from "@/stores/cart";

  let testProducts = [
    { id: 1, title: "Death Eater mask", price: 0.1, category: 1 },
    { id: 2, title: "Gryffindor sword", price: 0.0005, category: 1 },
    { id: 3, title: "Toilet paper", price: 1.0, category: 1 }
  ];

  productsInCart.addProduct(testProducts[0]);
  productsInCart.addProduct(testProducts[0]);
  productsInCart.addProduct(testProducts[1]);
  productsInCart.addProduct(testProducts[2]);
</script>

<div class="my-10 ml-10">
  <div class="grid grid-cols-3 gap-4">
    <div class="text-primary">Product</div>
    <div class="text-primary">Price</div>
    <div class="text-primary">Quantity</div>
    {#each $productsInCart as item, index}
      <div>
        {item.product.title}
      </div>
      <div>
        {item.product.price} BTC
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>{item.quantity}</div>
        <div>
          <button
            class="btn btn-primary btn-circle"
            on:click={() => productsInCart.addProduct(item.product)}>+</button
          >
          <button
            class="btn btn-primary btn-circle"
            on:click={() => productsInCart.removeProduct(item.product.id)}>-</button
          >
        </div>
      </div>
    {/each}
  </div>
  <div>
    <div class="text-primary font-bold">total price: {$totalPrice} BTC</div>
  </div>
</div>
