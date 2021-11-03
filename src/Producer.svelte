<script>
	import Toggle from "./Toggle.svelte";

	export let commandParameters;
	export let response;
	export let errorMessage = "";

	let isJsonMessage = true;
	let message = "";
	let header = "";

	export function generate() {
		try {
			let json = JSON.parse(message);
			let msg = JSON.stringify(json);
			response = `echo '${msg}' | kafkacat -b ${commandParameters.ip}:${
				commandParameters.port
			} -t ${commandParameters.topic} ${
				header ? "-H type=" + header : ""
			} -c 1 -P`;
		} catch (e) {
			console.log(e);
			errorMessage = e.message;
			response = null;
		}
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
