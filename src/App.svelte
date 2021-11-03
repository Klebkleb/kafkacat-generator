<script lang="ts">
	import Producer from "./Producer.svelte";
	import Consumer from "./Consumer.svelte";
	import Menu from "./Menu.svelte";
	import { CommandParameters } from "./model/CommandParameters";

	let response = "";
	let errorMessage = "";
	let infoMessage = "";

	let menuOptions = ["Produce", "Consume"];
	let currentOption = menuOptions[0];

	let commandParameters = new CommandParameters()

	function menuOptionChanged(event: { detail: number; }) {
		currentOption = menuOptions[event.detail];
	}

	function copy() {
		navigator.clipboard.writeText(response).then(
			function () {
				infoMessage = "Copied to clipboard!";
			},
			function (e) {
				console.log(e.message);
				infoMessage = "Copy to clipboard failed :(";
			}
		);
	}

	function clear() {
		response = "";
	}
</script>

<div class="content">
	<h1>Kafkacat command generator</h1>
	<p>
		Are you (like me) always struggling with the kafkacat command to the
		point where you have just a bunch of ready-to-go commands saved up in a
		text file that you just modify every time you need it?
	</p>
	<p>Then this is the tool for you!</p>
	<p>
		Select if you want to produce or consume kafka messages, fill in the
		parameters and voila, a ready made kafkacat command that you can copy
		and paste where you need it. Enjoy!
	</p>
	<Menu options={menuOptions} on:menuItemChanged={menuOptionChanged} />
	<h3>Input</h3>
	<form>
		<label for="ip">IP</label>
		<input id="ip" bind:value={commandParameters.ip} />:<input
			id="port"
			type="number"
			bind:value={commandParameters.port}
		/>

		<label for="topic">Topic</label>
		<input id="topic" bind:value={commandParameters.topic} />
	</form>
	{#if currentOption == "Produce"}
		<Producer commandParameters={commandParameters} bind:response bind:errorMessage />
	{:else if currentOption == "Consume"}
		<Consumer commandParameters={commandParameters} bind:response bind:errorMessage />
	{/if}
	{#if response}
		<div>
			<h3>Message</h3>
			<button on:click={copy}>Copy</button>
			<button on:click={clear}>Clear</button>
			<p>{infoMessage}</p>
			<pre>
  	<code>
    	{response}
  	</code>
	</pre>
		</div>
	{/if}
	{#if errorMessage}
		<div>
			<h3>Error</h3>
			<p>{errorMessage}</p>
			<button on:click={clear}>Clear</button>
		</div>
	{/if}
</div>

<style>

	.content {
		background-color: white;
		width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	pre {
		overflow-x: auto;
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		word-wrap: break-word;
	}

	pre code {
		background-color: #eee;
		border: 1px solid #999;
		display: block;
		padding: 20px;
	}
</style>
