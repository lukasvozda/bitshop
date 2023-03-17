<script lang="ts">
  import { page } from "$app/stores";
  import { products } from "@/stores/products";
  import type { Product } from "@/types";
  import ProductForm from "@/lib/components/admin/ProductForm.svelte";
  import GoBackButton from "@/lib/components/admin/GoBackButton.svelte";
  import { ArrowLeftIcon } from "svelte-feathers";
  //import { Btc } from "svelte-cryptoicon";

  let product: Product;
  let productList: [string, Product][] = $products;
  let disabled = false;
  let productId = "";
  let imgBlob : Blob | null;

  $: {
    productId = $page.params.slug;
    let item = productList.find((p) => p[0] === productId);
    if (item) {
      product = item[1];
    }
  }

  const updateProduct = async () => {
    disabled = true;
    console.log("Calling update, blob:", imgBlob)
    await products.updateProduct(productId, product);
    disabled = false;
  };

  const deleteProduct = async () => {
    if (confirm("Are you sure to delete this product?")) {
      disabled = true;
      let res = await products.deleteProduct(productId);
      if (res) {
        // if product was deteled, clear it in the front-end
        product = null;
      }
      disabled = false;
    }
  };
</script>

{#if product}
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Product detail: {product.title}</h1>
    </div>
    <div class="ml-auto">
      <GoBackButton />
    </div>
  </div>
  <ProductForm {disabled} {product} submitFunction={updateProduct} {imgBlob} />
  <div class="flex justify-end">
    {#if disabled === true}
      <button type="button" class="btn btn-warning my-4 loading" on:click={deleteProduct}>
        Delete product
      </button>
    {:else}
      <button type="button" class="btn btn-warning my-4 " on:click={deleteProduct}>
        Delete product
      </button>
    {/if}
  </div>
{:else}
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Product detail</h1>
    </div>
    <div class="ml-auto">
      <GoBackButton />
    </div>
  </div>
  <div>Product was deleted or not found.</div>
{/if}
