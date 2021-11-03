<script lang="ts">
	import { is_empty } from "svelte/internal";
	import { CommandParameters } from "./model/CommandParameters";
	import Toggle from "./Toggle.svelte";
	import { createEventDispatcher } from 'svelte';
	import { GenerationResult } from "./model/GenerationResult";

	export let commandParameters: CommandParameters;

	const dispatch = createEventDispatcher();

	let result: GenerationResult;

	let formatResponse = true;
	let showHeader = true;
	let showTimestamp = true;
	let customFormat = "";

	let messageCount = 100;
	let searchTerm = "";
	let format = "";

	function generate() {
		result = new GenerationResult();
		try {
			let searchCommand = "";
			if (searchTerm) {
				searchCommand = ` | grep -B 1 -A 1 "${searchTerm}"`;
			}
			createFormatString();
			result.message = `kafkacat -b ${commandParameters.ip}:${commandParameters.port} -t ${commandParameters.topic} -p 0 -o -${messageCount} -e ${format}${searchCommand}`;
			result.success = true;
		} catch (e) {
			console.log(e);
			result.message = e.message;
			result.success = false;
		}
		dispatch('commandGenerated', result)
	}

	function createFormatString() {
		if (formatResponse && !customFormat) {
			format = `-f "${showTimestamp ? "\\nTimestamp: %T" : ""}${
				showHeader ? "\\nHeader: %h" : ""
			}\\n%s\\n"`;
		} else if (formatResponse && customFormat) {
			format = `-f "${customFormat}"`;
		} else {
			format = "";
		}
	}
</script>

<form>
	<label for="search">Search term</label>
	<input id="search" bind:value={searchTerm} />

	<label for="messageCount"
		>Number of messages to {searchTerm ? "search" : "display"}</label
	>
	<input id="messageCount" bind:value={messageCount} type="number" />

	<div class="formatDivOuter">
		<div class="formatDivHeader">
			<span class="formatDivLabel">Format</span>
			<div class="toggleDiv">
				<Toggle label="Format response" bind:toggled={formatResponse} />
			</div>
		</div>
		<div class="formatDiv">
			<Toggle
				label="Show timestamp"
				bind:toggled={showTimestamp}
				disabled={!formatResponse || !is_empty(customFormat) }
			/>
			<Toggle
				label="Show header"
				bind:toggled={showHeader}
				disabled={!formatResponse || !is_empty(customFormat)}
			/>
			<label for="customFormat" class:disabled={!formatResponse}
				>Custom format string (overrides timestamp and header toggles)</label
			>
			<input
				id="customFormat"
				bind:value={customFormat}
				type="text"
				disabled={!formatResponse}
			/>
		</div>
	</div>
</form>
<button on:click={generate}> Generate </button>

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
