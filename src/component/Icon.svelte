<script context="module">
  export const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]
</script>

<script>
	import { createEventDispatcher } from 'svelte';
  
  export let name = "save"
  export let direction = "n"
  export let size = "1em"

  const dispatch = createEventDispatcher();

  $: rotation = directions.indexOf(direction) * 45

  function click() {
		dispatch('clicked', {
			name: name
		});
	}
</script>

<button on:click={click}>
  <img 
  class="c"
  src="resources/icons/{name}.svg"
  alt={name}
  style="{`transform: rotate(${rotation}deg); width: ${size}; height: ${size}`}"/>
</button>

<style>

  button {
    border: none;
    background-color: transparent;
  }
  .c {
    fill: currentColor;
    transition: all 0.3s ease-out;
    overflow: visible;
  }
</style>