<script>
  import { AlertTriangleIcon, CheckCircleIcon } from "svelte-feathers";
  import { alerts, alertVisibility } from "@/stores/alerts";
  import { Status } from "@/lib/utils";
  import { navigating } from "$app/stores";

  let alert = {};
  $: alert = $alerts.length > 0 ? $alerts.at(-1) : {};
  $: if ($navigating) alertVisibility.hideAlert();
</script>

{#if $alertVisibility}
  <div class="w-5/6 md:w-3/4 mx-auto my-6">
    <div
      class="alert rounded-6xl {alert?.type === Status.SUCCESS ? 'alert-success' : 'alert-error'}"
    >
      <div>
        <svelte:component
          this={alert?.type === Status.SUCCESS ? CheckCircleIcon : AlertTriangleIcon}
        />
        <span>{alert?.message}</span>
      </div>
    </div>
  </div>
{/if}
