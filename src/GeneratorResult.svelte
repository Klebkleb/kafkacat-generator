<script lang="ts">
	import { GenerationResult } from "./model/GenerationResult";

    let result: GenerationResult
    let infoMessage = "";

    export function setResult(newResult: GenerationResult) {
        clear();
        result = newResult;
    }

	function copy() {
		if(result?.success) {
			navigator.clipboard.writeText(result.message).then(
				function () {
					infoMessage = "Copied to clipboard!";
				},
				function (e) {
					console.log(e.message);
					infoMessage = "Copy to clipboard failed :(";
				}
			);
		}
	}

	function clear() {
		result = null;
		infoMessage = "";
	}
</script>

{#if (result?.success)}
<div>
    <h3>Message</h3>
    <button on:click={copy}>Copy</button>
    <button on:click={clear}>Clear</button>
    <p>{infoMessage}</p>
    <pre>
        <code>
            {result.message}
        </code>
    </pre>
</div>
{/if}
{#if (result && !result.success)}
<div>
    <h3>Error</h3>
    <p>{result.message}</p>
    <button on:click={clear}>Clear</button>
</div>
{/if}

<style>
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