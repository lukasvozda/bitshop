<script lang="ts">
  import { products } from "@/stores/products";
  import ProductForm from "@/lib/components/admin/ProductForm.svelte";
  import GoBackButton from "@/lib/components/admin/GoBackButton.svelte";
  import type { Product, UserProduct } from "@/types";

  let disabled = false;
  let created = false;
  let newProduct: Product;
  let imgBlob: Blob | null = [];

  let product: UserProduct = {
    title: "",
    price: 1,
    category: "default",
    description: "",
    inventory: 1,
    active: true
  };

  const createProduct = async () => {
    disabled = true;
    let res = await products.createProduct(product, imgBlob);
    if (res && res.slug != "") {
      created = true;
      newProduct = res;
    }
    disabled = false;
  };
</script>

<div class="flex my-4">
  <div class="mr-auto">
    <h1>Create a product</h1>
  </div>
  <div class="ml-auto">
    <GoBackButton />
  </div>
</div>
{#if !created}
  <ProductForm {disabled} {product} submitFunction={createProduct} bind:imgBlob />
{:else}
  <div>
    Product was successfully created. You can edit it here: <a
      href="/admin/products/{newProduct.slug}"
      class="link">{newProduct.title}</a
    >
  </div>
{/if}
