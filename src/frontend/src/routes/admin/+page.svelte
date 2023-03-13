<script lang="ts">
  import { getAdminPanelInfo } from "@/stores/admin";
  import { onMount } from "svelte";
  import { Circle } from "svelte-loading-spinners";

  let info = null;

  onMount(async () => {
    info = await getAdminPanelInfo();
  });
</script>

<div class="my-4">
  <h1>Admin panel</h1>
  <div class="mt-5">
    {#if !info}
      <div class="flex w-full items-center justify-center my-24">
        <Circle size="100" color="gray" />
      </div>
    {:else}
      <div class="grid grid-cols-12 gap-5 mt-5">
        <div class="col-span-4">
          <div class="card w-100 glass">
            <div class="card-body py-5">
              <h2 class="card-title">Total orders</h2>
              <span>{info?.ordersCount}</span>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="card w-100 glass">
            <div class="card-body py-5">
              <h2 class="card-title">Total revenue</h2>
              <span>{info?.totalRevenue} Satoshi</span>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="card w-100 glass">
            <div class="card-body py-5">
              <h2 class="card-title">Account balance</h2>
              <span>{info?.accountBalance} Satoshi</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
