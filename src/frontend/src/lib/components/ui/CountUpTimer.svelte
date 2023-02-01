<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let maximumElapsedSeconds = Number.MAX_SAFE_INTEGER;

  const dispatch = createEventDispatcher();

  let secondsElapsed = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let countUp = setInterval(() => {
    if (secondsElapsed < maximumElapsedSeconds) {
      secondsElapsed++;
      hours = Math.floor(secondsElapsed / 3600);
      minutes = Math.floor((secondsElapsed - hours * 3600) / 60);
      seconds = secondsElapsed - Math.round(hours * 3600 + minutes * 60);
    } else {
      clearInterval(countUp);
      dispatch("timeIsUp");
    }
  }, 1000);

  onMount(() => countUp);
</script>

<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span style="--value:{hours};" />
    </span>
    hours
  </div>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span style="--value:{minutes};" />
    </span>
    minutes
  </div>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span style="--value:{seconds};" />
    </span>
    seconds
  </div>
</div>
