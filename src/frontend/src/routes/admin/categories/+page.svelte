<script>
  import { categories } from "@/stores/products";
</script>

<section>
  <div class="flex my-4">
    <div class="mr-auto">
      <h1>Categories</h1>
    </div>
    <div class="ml-auto">
      <a href="/admin/categories/create" class="btn">+ New category</a>
    </div>
  </div>
  <div class="overflow-x-auto w-full">
    <table class="table w-full table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <!-- rows -->
        {#each $categories as c}
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">{c[1].name}</div>
                </div>
              </div>
            </td>
            <th>
              <div class="flex justify-end">
                <div>
                  <a href="/admin/categories/{c[0]}" class="btn btn-sm">detail</a>
                </div>
              </div>
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
