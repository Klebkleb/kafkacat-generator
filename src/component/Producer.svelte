<script lang="ts">

	import Toggle from "./Toggle.svelte";
	import { ProducerCommandParameters } from "../model/ProducerCommandParameters";
	import GeneratorStandardInput from "./GeneratorStandardInput.svelte";
	import { ProducerGenerationService } from "../service/ProducerGenerationService";
	import Container from "typedi";
	import { EnvironmentStorageService } from "../service/EnvironmentStorageService";

	const generator = Container.get(ProducerGenerationService)

	let commandParameters: ProducerCommandParameters = new ProducerCommandParameters();

	let environmentStorage = Container.get(EnvironmentStorageService)

	function generate() {
		let success = generator.generate(commandParameters);
		if(success) {
			environmentStorage.getProduceCommandStorage().saveItem(new Date().toLocaleString(), commandParameters)
		}
	}

	environmentStorage.getProduceCommandStorage().onLoad().subscribe(produceCommand => {
		commandParameters = produceCommand;
	})
</script>

<GeneratorStandardInput commandParameters={commandParameters}></GeneratorStandardInput>
<h3>Producer Input</h3>
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
