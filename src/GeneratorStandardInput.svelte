<script lang="ts">
    import { CommandParameters } from "./model/CommandParameters";


    export let commandParameters: CommandParameters
</script>

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
