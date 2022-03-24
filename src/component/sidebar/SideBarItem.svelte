<script lang="ts">
    import Icon from "../Icon.svelte";
    import { createEventDispatcher } from 'svelte';
    import NameModal from './NameModal.svelte';
	import Modal, { bind } from 'svelte-simple-modal';
    import { writable } from 'svelte/store';
    import type { SideBarUpdateEvent } from "../../model/SideBarUpdateEvent";
    
    const modal = writable(null);

    export let name: string;
    export let value: string;

    const dispatch = createEventDispatcher();

    const onOkay = (event: SideBarUpdateEvent) => {
        dispatch("edit", event)
	}

    const showModal = () => modal.set(bind(NameModal, { name: name, value: value, onOkay }));

    function click(action: string) {
		dispatch(action)
	}
</script>

<Modal show={$modal}></Modal>
<div class='itemContainer'>
    <div on:click={() => click("open")}>
        <div class='name'>{name}</div>
        {#if name != value}
        <div class='value'>{value}</div>
        {/if}
    </div>
    <div class='edit button'><Icon name='edit' size='1.2em' on:clicked={showModal}></Icon></div>
    <div class='delete button'><Icon name='remove' size='1.2em' on:clicked={() => click("remove")}></Icon></div>
</div>

<style>
    .itemContainer {
        display: inline-grid;
        grid-template-columns: auto 1.2em 1.2em;
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
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .name, .value{
        text-align: left;
        margin-left: 16px;
    }

    .value {
        font-size: 0.75em;
        white-space: pre;
        font-family: monospace;
        color: darkgray;
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