<script>
  import { products } from "@/stores/products";
  import { Btc } from "svelte-cryptoicon";
</script>

<section>
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Products</h1>
    </div>
    <div class="ml-auto">
      <a href="/admin/products/create" class="btn">+ New product</a>
    </div>
  </div>
  <div class="overflow-x-auto w-full">
    <table class="table w-full table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>Product</th>
          <th>Status</th>
          <th>Price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <!-- rows -->
        {#each $products as p}
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    {#if p[1].img != ""}
                      {#if import.meta.env.MODE == "development"}
                        <img
                          src="http://127.0.0.1:8008/?canisterId={import.meta.env
                            .VITE_BACKEND_CANISTER_ID}&imgid={p[1].img}"
                          alt={p[1].title}
                        />
                      {:else}
                        <img
                          src="https://{import.meta.env
                            .VITE_BACKEND_CANISTER_ID}.raw.ic0.app/?imgid={p[1].img}"
                          alt={p[1].title}
                          class="hover:scale-110 transition ease-in duration-300 opacity-90 hover:opacity-100"
                        />
                      {/if}
                    {:else}
                      <img src="/product.jpg" alt="Default image" />
                    {/if}
                  </div>
                </div>
                <div>
                  <div class="font-bold">{p[1].title}</div>
                  <div class="text-sm opacity-50">{p[1].category}</div>
                </div>
              </div>
            </td>
            <td>
              {p[1].active ? "Active" : "Paused"}
            </td>
            <td>
              <div class="flex items-center">
                <span>{p[1].price}</span>
                <span class="ml-1">
                  <span>SATs</span>
                  <!--                  <Btc color="black" size="15" />-->
                </span>
              </div>
            </td>
            <th>
              <a href="/admin/products/{p[0]}" class="btn btn-sm">detail</a>
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
