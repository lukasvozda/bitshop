<script type="module" lang="ts">
  import { onMount } from "svelte";
  //import { createActor } from "../../../declarations/backend";
  import { actor } from "@/stores";

  // Canister IDs are automatically expanded to .env config - see vite.config.ts
  const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

  // We pass the host instead of using a proxy to support NodeJS >= v17 (ViteJS issue: https://github.com/vitejs/vite/issues/4794)
  const host = import.meta.env.VITE_HOST;

  // Create an actor to interact with the IC for a particular canister ID
  // TODO this is throwing TypeError: fetch failed in the terminal when exposed here (doesnt happen when called later)
  //const actor = createActor(canisterId, { agentOptions: { host } });

  let input = "";
  let disabled = false;
  let greeting = "";
  let title = "";
  let price = 0;
  let products = [];

  let derived_address = "";
  let owner_xpub = "";
  let QRCodeCanvas;

  const handleOnSubmit = async () => {
    disabled = true;

    try {
      // Call the IC
      greeting = await actor.greet(input);
    } catch (err: unknown) {
      console.error(err);
    }

    disabled = false;
  };

  const listProducts = async () => {
    console.log("getting products");
    try {
      // Call the IC
      products = await actor.list_products();
      console.log(products);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const submitProduct = async () => {
    disabled = true;
    let result = await actor.create_product({ title: title, price: BigInt(price), category: 0 }); // BigInt TS wtf
    // TODO handle errors
    console.log(result);
    listProducts();
    disabled = false;
  };

  const setOwnerXPUB = async () => {
    let result = await actor.setOwnerXPUB(owner_xpub);
    console.log(result);
  };

  const deleteOwnerXPUB = async () => {
    await actor.deleteOwnerXPUB();
  };

  const getOwnerXPUB = async () => {
    await actor.getOwnerXPUB();
  };

  const generateNextChildAddress = async () => {
    try {
      let result = await actor.generateNextPaymentAddress();
      console.log(result.ok);
      if (result.ok !== null) {
        derived_address = result.ok;
        QRCode.toCanvas(QRCodeCanvas, derived_address, function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("success!");
          }
        });
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // const getaChildP2PKH = async () => {
  // 	console.log('getting public key');
  // 	derived_address = await actor.getaChildP2PKH(xpub);
  // 	console.log('address', derived_address[0]);
  // 	console.log(QRCodeCanvas);
  // 	QRCode.toCanvas(QRCodeCanvas, derived_address[0], function (error) {
  // 		if (error) console.error(error);
  // 		console.log('success!');
  // 	});
  // };

  onMount(async () => {
    await listProducts();
  });
</script>

<main>
  <img src="logo2.svg" alt="DFINITY logo" />
  <br />
  <br />

  <form on:submit|preventDefault={handleOnSubmit}>
    <label for="name">Enter your name: &nbsp;</label>
    <input id="name" alt="Name" type="text" bind:value={input} {disabled} />
    <button type="submit">Click Me!</button>
  </form>

  <section id="greeting">
    {greeting}
  </section>
  <hr />
  <section>
    <h1>Input xpub</h1>
    <form on:submit|preventDefault={setOwnerXPUB}>
      <label for="title">xpub: &nbsp;</label>
      <input
        id="title"
        alt="title"
        type="text"
        bind:value={owner_xpub}
        {disabled}
        style="width: 600px;"
      />
      <button type="submit" {disabled}>
        {#if disabled === true}
          Loading...
        {:else}
          Set owners public key
        {/if}
      </button>
    </form>
    <form on:submit|preventDefault={generateNextChildAddress}>
      <button type="submit" {disabled}>
        {#if disabled === true}
          Loading...
        {:else}
          Derive child key
        {/if}
      </button>
    </form>
    <div>
      <label for="title">derived address: &nbsp;</label>
      <input
        id="title"
        alt="title"
        type="text"
        bind:value={derived_address}
        disabled
        style="width: 600px;"
      />
    </div>
    <div>
      <div class="container" hidden={derived_address === ""}>
        <canvas bind:this={QRCodeCanvas} />
      </div>
    </div>
    <hr />
  </section>
  <section>
    <h1>Products</h1>
    <form on:submit|preventDefault={submitProduct}>
      <label for="title">Title: &nbsp;</label>
      <input id="title" alt="title" type="text" bind:value={title} {disabled} />
      <label for="price">Price: &nbsp;</label>
      <input id="price" alt="price" type="number" bind:value={price} {disabled} />
      <button type="submit" {disabled}>
        {#if disabled === true}
          Loading...
        {:else}
          Create product
        {/if}
      </button>
    </form>
    <div class="products">
      {#each products as p}
        <div class="product">
          <span class="id">#{p[0]} - </span>
          <span class="title">{p[1].title} - </span>
          <span class="price">{p[1].price} BTC</span>
          <!-- <span class="category">Category: {p[1].category}</span> -->
        </div>
      {/each}
    </div>
  </section>
</main>

<style lang="scss">
  img {
    max-width: 50vw;
    max-height: 25vw;
    display: block;
    margin: auto;
  }

  form {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    flex-flow: row wrap;
    max-width: 40vw;
    margin: auto;
    align-items: baseline;
    font-family: sans-serif;
    font-size: 1.5rem;
  }

  button[type="submit"] {
    padding: 5px 20px;
    margin: 10px auto;
    float: right;
  }

  #greeting {
    margin: 10px auto;
    padding: 10px 60px;
    border: 1px solid #222;
  }

  #greeting:empty {
    display: none;
  }

  .product {
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
  }
</style>
