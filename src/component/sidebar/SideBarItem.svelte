<script lang="ts">
    import Icon from "../Icon.svelte";
    import { createEventDispatcher } from 'svelte';

    export let name: string;

    const dispatch = createEventDispatcher();

    function click(action: string) {
		dispatch(action, {
			name: name
		});
	}
</script>

<div class='itemContainer'>
    <div class='name' on:click={() => click("open")}>{name}</div>
    <div class='edit button'><Icon name='edit' size='1.2em' on:clicked={() => click("edit")}></Icon></div>
    <div class='delete button'><Icon name='remove' size='1.2em' on:clicked={() => click("remove")}></Icon></div>
</div>

<style>
    .itemContainer {
        display: inline-grid;
        grid-template-columns: auto 1.2em 1.2em;
        grid-template-rows: 32px;
        column-gap: 8px;
        width: 100%;
        align-items: center;
        position: relative;
		line-height: 1.2;
		margin: 0 0 0.5em 0;
		border-radius: 2px;
		user-select: none;
		border: 1px solid hsl(240, 8%, 70%);
		background-color:hsl(240, 8%, 93%);
		color: #333;
        cursor: pointer;
    }

    .name {
        text-align: left;
        margin-left: 1em;
    }

    .button {
		height: 100%;
		background-size: 1.4em 1.4em;
		border: none;
		opacity: 0;
		transition: opacity 0.2s;
		text-indent: -9999px;
    }

    .itemContainer:hover .button {
		opacity: 1;
	}


</style>