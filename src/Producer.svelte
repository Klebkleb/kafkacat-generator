<script lang="ts">

	import Toggle from "./Toggle.svelte";
	import { ProducerCommandParameters } from "./model/ProducerCommandParameters";
	import GeneratorStandardInput from "./GeneratorStandardInput.svelte";
	import { ProducerGenerationService } from "./service/ProducerGenerationService";

	const generator = new ProducerGenerationService();

	let commandParameters: ProducerCommandParameters = new ProducerCommandParameters();
</script>

<GeneratorStandardInput commandParameters={commandParameters}></GeneratorStandardInput>
<form>
	<label for="header">Header</label>
	<input id="header" bind:value={commandParameters.header} />

	<div class="messageHeader">
		<label for="message">{commandParameters.isJsonMessage ? "JSON" : ""} Message</label>
		<div class="toggleDiv">
			<Toggle label="JSON" bind:toggled={commandParameters.isJsonMessage} />
		</div>
	</div>
	<textarea id="message" bind:value={commandParameters.message} />
</form>
<button on:click={() => generator.generate(commandParameters)}> Generate </button>

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
