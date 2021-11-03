<script lang="ts">
	import Producer from "./Producer.svelte";
	import Consumer from "./Consumer.svelte";
	import Menu from "./Menu.svelte";
	import { GenerationResult } from "./model/GenerationResult";
	import GeneratorResult from "./GeneratorResult.svelte";

	let menuOptions = ["Produce", "Consume"];
	let currentOption = menuOptions[0];
	let resultContainer: GeneratorResult;

	function menuOptionChanged(event: { detail: number; }) {
		currentOption = menuOptions[event.detail];
	}

    function generationDone(event: {detail: GenerationResult; }) {
		if(resultContainer) {
			console.log(resultContainer)
			resultContainer.setResult(event.detail);
		}
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
	{#if currentOption == "Produce"}
		<Producer on:commandGenerated={generationDone}/>
	{:else if currentOption == "Consume"}
		<Consumer on:commandGenerated={generationDone}/>
	{/if}
	<GeneratorResult bind:this={resultContainer}></GeneratorResult>
</div>

<style>
	.content {
		background-color: white;
		width: 800px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
