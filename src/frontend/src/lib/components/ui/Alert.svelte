<script>
  import { AlertTriangleIcon, CheckCircleIcon } from "svelte-feather-icons";
  import { alerts, alertVisibility } from "@/stores/alerts";
  import { Status } from "@/lib/utils";

  let alert = {};
  $: alert = $alerts.length > 0 ? $alerts.at(-1) : {};
</script>

{#if $alertVisibility}
  <div class="alert shadow-lg {Status.SUCCESS ? 'alert-error' : 'alert-success'}">
    <div>
      <svelte:component
        this={alert?.type === Status.SUCCESS ? CheckCircleIcon : AlertTriangleIcon}
      />
      <span>{alert?.message}</span>
    </div>
  </div>
{/if}
