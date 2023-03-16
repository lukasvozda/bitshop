<script lang="ts">
  import { listOrders } from "@/stores/orders";
  import type { Order } from "@/types";
  import { onMount } from "svelte";

  let orders: [string, Order][] = [];

  function nanosecondsToDatetime(nanoseconds) {
    let date = new Date(Number(nanoseconds / 1000000n));
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    let iso = date.toISOString().split("T");
    return `${iso[0]} ${iso[1].split(".")[0]}`;
  }

  onMount(async () => {
    orders = await listOrders();
    console.log(orders);
  });
</script>

<section>
  <div class="flex my-4">
    <h1>Orders</h1>
  </div>

  <div class="overflow-x-auto">
    <table class="table w-full table-compact">
      <thead>
        <tr>
          <th />
          <th>UUID</th>
          <th>Time</th>
          <th>Status</th>
          <th>Payment Address</th>
          <th>Transaction ID</th>
          <th>Total price</th>
          <th>Products</th>
          <th>Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        {#each orders as [uuid, order], index}
          <tr>
            <td>{index + 1}</td>
            <td class="font-mono text-sm">{uuid}</td>
            <td>{nanosecondsToDatetime(order.timeCreated)}</td>
            <td>{Object.keys(order.status)[0]}</td>
            <td class="font-mono text-sm">{order.paymentAddress}</td>
            <td class="font-mono text-sm">{order.transactionId}</td>
            <td class="font-mono text-sm">{order.totalPrice} Satoshi</td>
            <td>
              {#each order.products as product, _}
                <div>
                  <span>Product ID: {product.id} | Qty: {product.quantity}x</span>
                </div>
              {/each}
            </td>
            <td>
              <div>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
              <div>
                {order.shippingAddress.postCode},
                {order.shippingAddress.county}
                {order.shippingAddress.city}
              </div>
              <div>{order.shippingAddress.country}</div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
