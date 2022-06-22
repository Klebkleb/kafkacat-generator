<script>
  import { getContext } from 'svelte';
  import { EditMode } from '../../model/EditMode';
  import { SideBarUpdateEvent } from '../../model/SideBarUpdateEvent';

  export let onOkay = () => {};
  export let name;
  export let value;
  export let edit = EditMode.FULL;
  let newName = name;

  const { close } = getContext('simple-modal');

  function save() {
		onOkay(new SideBarUpdateEvent(name, newName, value));
		close();
  }
</script>

<div class='form'>
  {#if (edit == EditMode.FULL)}
  <h4>Edit value</h4>
  {:else if (edit == EditMode.NAME_ONLY)}
  <h4>Edit name</h4>
  {/if}
  <label for='name'>Name</label>
  <input id='name' type="text" bind:value={newName} on:keydown={e => e.key === 'Enter' && save()}>
  <label for='value'>Value</label>
  <input disabled={edit != EditMode.FULL} id='value' type="text" bind:value={value} on:keydown={e => e.key === 'Enter' && save()}>
  <button on:click={save}>Save</button>
</div>

<style>
 .form {
   text-align: left;
   display: inline-flex;
   flex-direction: column;
   width: 100%;
 }
</style>