<script lang="ts">
    import Container from "typedi";

    import type { CommandParameters } from "./model/CommandParameters";
    import { EnvironmentStorageService } from "./service/EnvironmentStorageService";

    export let commandParameters: CommandParameters

    let environmentStorage = Container.get(EnvironmentStorageService)

    let currentName: string

    function save() {
        environmentStorage.getEnvironmentStorage().saveItem(currentName, commandParameters)
    }
</script>

<h3>Input</h3>
<form>
    <label for='name'>Name</label>
    <input type='text' bind:value={currentName}>
</form>
<button on:click={save}> Save</button>
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
