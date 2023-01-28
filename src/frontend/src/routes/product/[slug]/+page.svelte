<script>
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  
  let product;
  let productList = $products
  
  $: {  
    product = productList.find((p) => p[0] === $page.params.slug); 
  }
</script>

<h2>Product detail for slug:{$page.params.slug}</h2>
<div class="divider" />
{#if product}
  <h1>{product[1].title}</h1>
  <p>{product[1].description}</p>
{/if}
<div class="divider" />
<h2>Other products</h2>
{#each $products as p}
  <div class="product">
    <div class="title">Title {p[1].title}</div>
    <div class="title">Category: {p[1].category}</div>
    <div class="price">Price: {p[1].price} BTC</div>
    <a class="link link-primary" href="/product/{p[1].slug}">Detail</a>
    <!-- <span class="category">Category: {p[1].category}</span> -->
  </div>
{/each}
