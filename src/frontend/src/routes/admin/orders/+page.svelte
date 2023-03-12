<script lang="ts">
  import { listOrders } from "@/stores/orders";
  import type { Order } from "@/types";
  import { onMount } from "svelte";

  let orders: [string, Order][] = [];

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
    <table class="table table-zebra w-full table-compact">
      <thead>
        <tr>
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
        {#each orders as [uuid, order], _}
          <tr>
            <td>{uuid}</td>
            <td>{order.timeCreated}</td>
            <td>{order.status}</td>
            <td>{order.paymentAddress}</td>
            <td>{order.transactionId}</td>
            <td>{order.totalPrice} BTC</td>
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
