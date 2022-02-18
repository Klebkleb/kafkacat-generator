<script lang="ts">
    import Container from "typedi";

    import type { CommandParameters } from "./model/CommandParameters";
    import { EnvironmentStorageService } from "./service/EnvironmentStorageService";

    export let commandParameters: CommandParameters

    let environmentStorage = Container.get(EnvironmentStorageService)

    environmentStorage.getIPStorage().onLoad().subscribe(ip => {
        let split = ip.split(':', 2)
        commandParameters.ip = split[0]
        commandParameters.port = Number.parseInt(split[1])
    })

    environmentStorage.getTopicStorage().onLoad().subscribe(topic => {
        commandParameters.topic = topic;
    })

    function saveIP() {
        let formatted = commandParameters.ip + ":" + commandParameters.port
        environmentStorage.getIPStorage().saveItem(formatted, formatted)
    }

    function saveTopic() {
        environmentStorage.getTopicStorage().saveItem(commandParameters.topic, commandParameters.topic)
    }
</script>

<h3>Input</h3>
<form>
    <label for="ip">IP</label>
    <input id="ip" bind:value={commandParameters.ip} />:<input
        id="port"
        type="number"
        bind:value={commandParameters.port}
    />
    <button on:click={saveIP}> Save</button>

    <label for="topic">Topic</label>
    <input id="topic" bind:value={commandParameters.topic} />
    <button on:click={saveTopic}> Save</button>
</form>
