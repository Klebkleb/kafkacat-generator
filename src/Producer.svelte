<script lang="ts">
	import { CommandParameters } from "./model/CommandParameters";
	import Toggle from "./Toggle.svelte";
	import { createEventDispatcher } from 'svelte';
	import { GenerationResult } from "./model/GenerationResult";

	export let commandParameters: CommandParameters;

	const dispatch = createEventDispatcher();
	
	let result: GenerationResult;
	let isJsonMessage = true;
	let message = "";
	let header = "";

	function generate() {
		result = new GenerationResult();
		try {
			let msg: string;
			if(isJsonMessage) {
				let json = JSON.parse(message);
				msg = JSON.stringify(json);
			} else {
				msg = message;
			}
			result.message = `echo '${msg}' | kafkacat -b ${commandParameters.ip}:${
				commandParameters.port
			} -t ${commandParameters.topic} ${
				header ? "-H type=" + header : ""
			} -c 1 -P`;
			result.success = true;
		} catch (e) {
			console.log(e);
			result.message = e.message;
			result.success = false;
		}
		dispatch('commandGenerated', result)
	}
</script>

<form>
	<label for="header">Header</label>
	<input id="header" bind:value={header} />

	<div class="messageHeader">
		<label for="message">{isJsonMessage ? "JSON" : ""} Message</label>
		<div class="toggleDiv">
			<Toggle label="JSON" bind:toggled={isJsonMessage} />
		</div>
	</div>
	<textarea id="message" bind:value={message} />
</form>
<button on:click={generate}> Generate </button>

<style>
	#message {
		width: 100%;
		height: 300px;
	}

	.messageHeader {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;
		align-items: end;
	}

	.toggleDiv {
		position: relative;
		padding: 0.25em;
		padding-left: 1em;
		border: 1.5px solid #ccc;
		border-bottom: 1px solid white;
		top: 1px;
	}
</style>
