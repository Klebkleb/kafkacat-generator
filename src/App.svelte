<script lang="ts">
	import Producer from "./component/Producer.svelte";
	import Consumer from "./component/Consumer.svelte";
	import Menu from "./component/Menu.svelte";
	import type { GenerationResult } from "./model/GenerationResult";
	import GeneratorResult from "./component/GeneratorResult.svelte";
	import SideBar from "./component/sidebar/SideBar.svelte";

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

<div class="main">
	<div class="sidebar left">
		<h2>Github</h2>
		<p>
			This project is open source.<br/>
			Github: <a href='https://github.com/Klebkleb/kafkacat-generator'>klebkleb/kafkacat-generator</a>
		</p>
		<p>
			If you would like extra features or if you found an issue, feel free to open a PR ;)
		</p>
	</div>
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
	<div class="sidebar right">
		<SideBar currentOption={currentOption}></SideBar>
	</div>
</div>

<style>

	.main {
		display: grid;
		grid-gap: 2em;
		grid-template-columns: 1fr 800px 1fr;
		align-items: start;
	}

	.content {
		background-color: white;
		max-width: 800px;
		justify-self: center;
		margin-bottom: 32px;
	}

	.sidebar {
		max-width: 300px;
		margin-bottom: 32px;
	}

	.sidebar.right {
		padding-right: 2em;
		text-align: right;
		margin-left: 50px;
	}

	.sidebar.left {
		justify-self: right;
		padding-left: 2em;
		text-align: left;
		margin-right: 50px;
	}

	
</style>
