<script>
	import { createEventDispatcher } from 'svelte';
	
	export let options = []
	export let activeId = 0;
	
	const dispatch = createEventDispatcher();
	
	function select(id) {
		activeId = id;
		dispatch('menuItemChanged', id);
	}
</script>

<div class='horizontal'>
	{#each options as option, i}
	<div class='menuItem' class:active={i==activeId} on:click={() => select(i)}>
		<h4>
			{option}
		</h4>
	</div>
	{/each}
</div>

<style>
	.menuItem {
		padding-left: 1em;
		padding-right: 1em;
		flex-grow: 1;
		border: 1px solid;
		text-align: center;
	}
	.horizontal {
		display: inline-flex;
		flex-direction: row;
		width: 100%;
	}
	
	.active {
		background-color: black;
		color: white;
	}

</style>