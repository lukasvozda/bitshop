<script lang="ts">
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import type { Product } from "@/types";
  import ProductForm from "@/lib/components/admin/ProductForm.svelte";
  //import { Btc } from "svelte-cryptoicon";

  let product: Product;
  let productList: [string, Product][] = $products;
  let disabled = false;

  $: {
    let item = productList.find((p) => p[0] === $page.params.slug);
    if (item) {
      product = item[1];
    }
  }

  const updateProduct = async () => {
    disabled = true;
    console.log(product);
    await products.updateProduct($page.params.slug, product);
    disabled = false;
  };
</script>

{#if product}
  <h1>Product detail: {product.title}</h1>
  <ProductForm {disabled} {product} submitFunction={updateProduct} />
{/if}
