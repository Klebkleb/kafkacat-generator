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
    <div class='edit'><Icon name='edit' size='1.2em' on:clicked={() => click("edit")}></Icon></div>
    <div class='delete'><Icon name='remove' size='1.2em' on:clicked={() => click("remove")}></Icon></div>
</div>

<style>
    .itemContainer {
        display: inline-grid;
        grid-template-columns: auto 1.2em 1.2em;
        grid-template-rows: 32px;
        column-gap: 8px;
        width: 100%;
        align-items: center;
    }

    .name {
        font-size: 1.2em;
    }


</style>