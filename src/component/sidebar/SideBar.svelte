<script lang="ts">
    import Container from 'typedi';
    import type { CustomArg } from '../../model/CommandParameters';
    import type { ConsumerCommandParameters } from '../../model/ConsumerCommandParameters';
    import { EditMode } from '../../model/EditMode';
    import type { ProducerCommandParameters } from '../../model/ProducerCommandParameters';
    import type { SideBarUpdateEvent } from '../../model/SideBarUpdateEvent';
    import { EnvironmentStorageService } from '../../service/EnvironmentStorageService';
    import SideBarItem from './SideBarItem.svelte';

    export let currentOption: String

    const envStorage = Container.get(EnvironmentStorageService)

    let ipKeys: string[];
    let topicKeys: string[];
    let customArgKeys: string[];
    let consumerCommandHistoryKeys: string[];
    let producerCommandHistoryKeys: string[];

    loadEnvs();
    envStorage.getIPStorage().onListChange().subscribe((newIpKeys) => {
        ipKeys = newIpKeys;
    })
    envStorage.getTopicStorage().onListChange().subscribe((newTopicKeys) => {
        topicKeys = newTopicKeys;
    })
    envStorage.getCustomArgumentStorage().onListChange().subscribe((newCustomArgKeys) => {
        customArgKeys = newCustomArgKeys;
    })
    envStorage.getConsumeCommandStorage().onListChange().subscribe((newConsumerCommandKeys) => {
        consumerCommandHistoryKeys = newConsumerCommandKeys;
    })
    envStorage.getProduceCommandStorage().onListChange().subscribe((newProduceCommandKeys) => {
        producerCommandHistoryKeys = newProduceCommandKeys;
    })

    function loadEnvs() {
        ipKeys = envStorage.getIPStorage().loadKeys()
        if(!ipKeys) {
            ipKeys = [];
        }
        topicKeys = envStorage.getTopicStorage().loadKeys()
        if(!topicKeys) {
            topicKeys = [];
        }
        customArgKeys = envStorage.getCustomArgumentStorage().loadKeys()
        if(!customArgKeys) {
            customArgKeys = [];
        }
        consumerCommandHistoryKeys = envStorage.getConsumeCommandStorage().loadKeys()
        if(!consumerCommandHistoryKeys) {
            consumerCommandHistoryKeys = [];
        }
        producerCommandHistoryKeys = envStorage.getProduceCommandStorage().loadKeys()
        if(!producerCommandHistoryKeys) {
            producerCommandHistoryKeys = [];
        }
    }

    function loadIp(name: string, broadCast = true): string {
        return envStorage.getIPStorage().loadItem(name, broadCast)
    }

    function loadTopic(name: string, broadCast = true): string {
        return envStorage.getTopicStorage().loadItem(name, broadCast)
    }

    function loadCustomArg(name: string, broadCast = true): CustomArg[] {
        return envStorage.getCustomArgumentStorage().loadItem(name, broadCast)
    }

    function loadConsumerCommand(name: string, broadCast = true): ConsumerCommandParameters {
        return envStorage.getConsumeCommandStorage().loadItem(name, broadCast)
    }

    function loadProducerCommand(name: string, broadCast = true): ProducerCommandParameters {
        return envStorage.getProduceCommandStorage().loadItem(name, broadCast)
    }

    function removeIP(name: string) {
        envStorage.getIPStorage().deleteItem(name)
    }

    function removeTopic(name: string) {
        envStorage.getTopicStorage().deleteItem(name)
    }

    function removeCustomArg(name: string) {
        envStorage.getCustomArgumentStorage().deleteItem(name)
    }

    function removeConsumerCommand(name: string) {
        envStorage.getConsumeCommandStorage().deleteItem(name)
    }

    function removeProducerCommand(name: string) {
        envStorage.getProduceCommandStorage().deleteItem(name)
    }

    function editIp(event: CustomEvent<SideBarUpdateEvent>) {
        envStorage.getIPStorage().updateItem(event.detail.name, event.detail.updatedName, event.detail.value);
    }

    function editTopic(event: CustomEvent<SideBarUpdateEvent>) {
        envStorage.getTopicStorage().updateItem(event.detail.name, event.detail.updatedName, event.detail.value);
    }

    function editCustomArg(event: CustomEvent<SideBarUpdateEvent>) {
        envStorage.getCustomArgumentStorage().updateItem(event.detail.name, event.detail.updatedName, JSON.parse(event.detail.value));
    }

    function replacer(key,value)
    {
       if( 
            key == "formatResponse" ||
            key == "showHeader" ||
            key == "showTimestamp" ||
            key == "isJsonMessage" ||
            !value
       ) {
           return undefined
       } else return value;
    }

</script>

<div class='sidebar'>
    <h2>Local Storage</h2>
    <p>Here you can save IPs, topics, custom arguments and view your command history.</p>
    <p><em>Everything is saved in your local storage only, nothing is stored on a server!</em> Check the <a href="https://github.com/Klebkleb/kafkacat-generator">source code</a> or the network tab if you don't believe me.</p>
    
    <h3>IPs</h3>
    {#each ipKeys as ipKey}
    <SideBarItem 
        name={ipKey} 
        value={loadIp(ipKey, false)}
        on:open={() => loadIp(ipKey)}
        on:edit={editIp}
        on:remove={() => removeIP(ipKey)}>
    </SideBarItem>
    {/each}
    {#if ipKeys.length == 0}
    <div class='empty'>
        <h4>There's nothing here</h4>
        <p>Save an IP address by pressing the save button next to the input field</p>
    </div>
    {/if}

    <h3>Topics</h3>
    {#each topicKeys as topicKey}
    <SideBarItem 
        name={topicKey} 
        value={loadTopic(topicKey, false)}
        on:open={() => loadTopic(topicKey)}
        on:edit={editTopic}
        on:remove={() => removeTopic(topicKey)}>
    </SideBarItem>
    {/each}
    {#if topicKeys.length == 0}
    <div class='empty'>
        <h4>There's nothing here</h4>
        <p>Save a topic by pressing the save button next to the input field</p>
    </div>
    {/if}

    <h3>Custom Arguments</h3>
    {#each customArgKeys as customArgKey}
    <SideBarItem 
        name={customArgKey} 
        value={JSON.stringify(loadCustomArg(customArgKey, false), null, 2)}
        edit={EditMode.NAME_ONLY}
        on:edit={editCustomArg}
        on:open={() => loadCustomArg(customArgKey)}
        on:remove={() => removeCustomArg(customArgKey)}>
    </SideBarItem>
    {/each}
    {#if customArgKeys.length == 0}
    <div class='empty'>
        <h4>There's nothing here</h4>
        <p>Save some custom arguments by pressing the save button below the 'Custom Arguments' list.</p>
    </div>
    {/if}

    <h3>{currentOption} Command History</h3>
    {#if currentOption == "Consume"}
        {#each consumerCommandHistoryKeys as consumerCommandKey}
        <SideBarItem 
            name={consumerCommandKey} 
            value={JSON.stringify(loadConsumerCommand(consumerCommandKey, false), replacer, 2)}
            edit={EditMode.NO_EDIT}
            on:open={() => loadConsumerCommand(consumerCommandKey)}
            on:remove={() => removeConsumerCommand(consumerCommandKey)}>
        </SideBarItem>
        {/each}
        {#if consumerCommandHistoryKeys.length == 0}
        <div class='empty'>
            <h4>There's nothing here</h4>
            <p>Commands will appear automagically when you generate them.</p>
        </div>
        {/if}
    {:else if currentOption == "Produce"}
        {#each producerCommandHistoryKeys as producerCommandKey}
        <SideBarItem 
            name={producerCommandKey} 
            value={JSON.stringify(loadProducerCommand(producerCommandKey, false), replacer, 2)}
            edit={EditMode.NO_EDIT}
            on:open={() => loadProducerCommand(producerCommandKey)}
            on:remove={() => removeProducerCommand(producerCommandKey)}>
        </SideBarItem>
        {/each}
        {#if producerCommandHistoryKeys.length == 0}
        <div class='empty'>
            <h4>There's nothing here</h4>
            <p>Commands will appear automagically when you generate them.</p>
        </div>
        {/if}
    {/if}
</div>

<style>
    .empty {
        color: darkgray;
        font-style: italic;
    }

    .empty h4 {
        margin-bottom: 0;
    }
</style>