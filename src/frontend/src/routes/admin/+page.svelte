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
    <div class="grid grid-cols-4 md:grid-cols-12 gap-5 mt-5">
      <div class="col-span-4">
        <div class="card w-100 glass">
          <div class="card-body py-5">
            <h2 class="card-title">Total orders</h2>
            {#if !info?.ordersCount}
              <div class="flex w-full items-center justify-center">
                <Circle size="20" color="gray" />
              </div>
            {:else}
              <span class="font-mono text-sm">{info?.ordersCount}</span>
            {/if}
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <div class="card w-100 glass">
          <div class="card-body py-5">
            <h2 class="card-title">Total revenue</h2>
            {#if !info?.totalRevenue}
              <div class="flex w-full items-center justify-center">
                <Circle size="20" color="gray" />
              </div>
            {:else}
              <span class="font-mono text-sm">{info?.totalRevenue} SATs</span>
            {/if}
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <div class="card w-100 glass">
          <div class="card-body py-5">
            <h2 class="card-title">Account balance</h2>
            {#if !info?.accountBalance}
              <div class="flex w-full items-center justify-center">
                <Circle size="20" color="gray" />
              </div>
            {:else}
              <span class="font-mono text-sm">{info?.accountBalance} SATs</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
