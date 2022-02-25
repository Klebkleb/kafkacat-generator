<script>
    import { getContext } from 'svelte';
    import { SideBarUpdateEvent } from '../../model/SideBarUpdateEvent';

    export let onOkay = () => {};
    export let name;
    export let value;
    let newName = name;

    const { close } = getContext('simple-modal');

    function save() {
		onOkay(new SideBarUpdateEvent(name, newName, value));
		close();
	}
</script>

<label for='name'>Name</label>
<input id='name' type="text" bind:value={newName} on:keydown={e => e.key === 'Enter' && save()}>
<label for='value'>Value</label>
<input id='value' type="text" bind:value={value} on:keydown={e => e.key === 'Enter' && save()}>
<button on:click={save}>Save</button>