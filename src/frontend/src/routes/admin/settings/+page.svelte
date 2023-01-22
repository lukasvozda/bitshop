<script>
  import { getOwnerXPUB } from "@/stores/payments";
  import { onMount } from "svelte";

  let xpub = "";
  onMount(async () => {
    console.log("tu");
    xpub = await getOwnerXPUB();
    console.log("tu2", xpub);
  });
</script>

<h2>Settings</h2>

<div>
  <input
    bind:value={xpub}
    type="text"
    placeholder="Paste you extended public key"
    class="input input-bordered w-full max-w-xs"
  />
  <button class="btn btn-primary">set public key</button>
</div>
