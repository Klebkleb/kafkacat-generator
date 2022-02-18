<script lang="ts">
	import { is_empty } from "svelte/internal";

	import Toggle from "./Toggle.svelte";
	import { ConsumerCommandParameters } from "./model/ConsumerCommandParameters";
	import { ConsumerGenerationService } from "./service/ConsumerGenerationService";
	import GeneratorStandardInput from "./GeneratorStandardInput.svelte";
	import Container from "typedi";

	let commandParameters: ConsumerCommandParameters = new ConsumerCommandParameters();

	const generator = Container.get(ConsumerGenerationService)
</script>


<GeneratorStandardInput commandParameters={commandParameters}></GeneratorStandardInput>
<form>
	<label for="search">Search term</label>
	<input id="search" bind:value={commandParameters.searchTerm} />

	<label for="messageCount"
		>Number of messages to {commandParameters.searchTerm ? "search" : "display"}</label
	>
	<input id="messageCount" bind:value={commandParameters.messageCount} type="number" />

	<div class="formatDivOuter">
		<div class="formatDivHeader">
			<span class="formatDivLabel">Format</span>
			<div class="toggleDiv">
				<Toggle label="Format response" bind:toggled={commandParameters.formatResponse} />
			</div>
		</div>
		<div class="formatDiv">
			<Toggle
				label="Show timestamp"
				bind:toggled={commandParameters.showTimestamp}
				disabled={!commandParameters.formatResponse || !is_empty(commandParameters.customFormat) }
			/>
			<Toggle
				label="Show header"
				bind:toggled={commandParameters.showHeader}
				disabled={!commandParameters.formatResponse || !is_empty(commandParameters.customFormat)}
			/>
			<label for="customFormat" class:disabled={!commandParameters.formatResponse}
				>Custom format string (overrides timestamp and header toggles)</label
			>
			<input
				id="customFormat"
				bind:value={commandParameters.customFormat}
				type="text"
				disabled={!commandParameters.formatResponse}
			/>
		</div>
	</div>
</form>
<button on:click={() => generator.generate(commandParameters)}> Generate </button>

<style>
	.formatDiv {
		width: calc(100% - 2em);
		display: inline-flex;
		flex-direction: column;
		border: 1px solid #ccc;
		padding: 1em;
	}

	.disabled {
		color: gray;
	}

	.formatDivHeader {
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
