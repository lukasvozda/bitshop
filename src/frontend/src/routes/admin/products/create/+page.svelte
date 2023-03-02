<script lang="ts">
  import { actor } from "@/stores";
  import { products } from "@/stores/products";
  import ProductForm from "@/lib/components/admin/ProductForm.svelte";
  import type { UserProduct } from "@/types";

  let disabled = false;

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
    await products.createProduct(product);
    disabled = false;
  };
</script>

<h1>Create a product</h1>
<ProductForm {disabled} {product} submitFunction={createProduct} />
