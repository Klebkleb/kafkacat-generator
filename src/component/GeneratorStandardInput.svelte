<script lang="ts">
    import Container from "typedi";

    import { CommandParameters, CustomArg } from "../model/CommandParameters";
    import { EnvironmentStorageService } from "../service/EnvironmentStorageService";

    export let commandParameters: CommandParameters

    let environmentStorage = Container.get(EnvironmentStorageService)

    setUseIP()

    environmentStorage.getIPStorage().onLoad().subscribe(ip => {
        let split = ip.split(':', 2)
        commandParameters.ip = split[0]
        commandParameters.port = Number.parseInt(split[1])
        setUseIP()
    })

    environmentStorage.getTopicStorage().onLoad().subscribe(topic => {
        commandParameters.topic = topic;
    })

    environmentStorage.getCustomArgumentStorage().onLoad().subscribe(args => {
        commandParameters.customArgs = args;
    })

    function setUseIP() {
        commandParameters.useIp = commandParameters.ip != ""
    }

    function saveIP() {
        let formatted = commandParameters.ip + ":" + commandParameters.port
        environmentStorage.getIPStorage().saveItem(formatted, formatted)
    }

    function saveTopic() {
        environmentStorage.getTopicStorage().saveItem(commandParameters.topic, commandParameters.topic)
    }

    function addCustomArg() {
        commandParameters.customArgs = [...commandParameters.customArgs, new CustomArg()]
        console.log(commandParameters.customArgs)
    }

    function removeArg(i: number) {
        commandParameters.customArgs.splice(i,1)
        commandParameters.customArgs = commandParameters.customArgs
    }

    function saveCustomArgs() {
        if(commandParameters.customArgs && commandParameters.customArgs.length > 0) {
            environmentStorage.getCustomArgumentStorage().saveItem(commandParameters.customArgs[0].value, commandParameters.customArgs)
        }
    }
</script>

<h3>General Input</h3>
<form>
    <label for="ip">IP</label>
    <input id="ip" bind:value={commandParameters.ip} on:input={setUseIP} />:<input
        id="port"
        type="number"
        disabled={!commandParameters.useIp}
        bind:value={commandParameters.port}
    />
    <button on:click={saveIP} type="button"> Save</button>

    <label for="topic">Topic</label>
    <input id="topic" bind:value={commandParameters.topic} />
    <button on:click={saveTopic} type="button"> Save</button>

    <div class='customArgs'>
        <h3 class='column1to3 title'>Custom Arguments</h3>
        <button class='column3 button' id="newArg" on:click={addCustomArg} type="button">+</button>

        {#if (commandParameters.customArgs && commandParameters.customArgs.length > 0)}

        <p class='column1'>Enabled</p>
        <p class='column2to4'>Argument</p>
    
        {#each commandParameters.customArgs as argument, i}
            <input class='column1' type="checkbox" bind:checked={argument.enabled}/>
            <input class='column2' bind:value={argument.value} disabled={!argument.enabled}/>
            <button class='column3' on:click={() => removeArg(i)} type="button">Remove</button>
        {/each}

        <button class='column3' on:click={saveCustomArgs} disabled={commandParameters.customArgs.some(el => el.enabled && !el.value)} type="button">Save</button>
        {:else}
        <p class='column1to4 description'>Press the '+' button to add a custom argument to this command. You can quickly enable or disable your custom commands with the enabled field.</p>
        {/if}
    </div>
</form>

<style>
    .customArgs {
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        align-items: center;
        padding: 1em 0 1em 0;
        margin: 1em 0 1em 0;

    }

    .title {
        margin: 0;
    }
    
    .button {
        margin: 0;
    }

    .description {
        color: gray;
    }

    .column1 {
        grid-column: 1 / 2;
    }

    .column1to3 {
        grid-column: 1 / 3
    }

    .column1to4 {
        grid-column: 1 / 4;
    }

    .column2 {
        grid-column: 2 / 3;
    }

    .column2to4 {
        grid-column: 2 / 4;
    }

    .column3 {
        grid-column: 3 / 4;
    }

</style>
