<script lang="ts">
    import Container from 'typedi';
    import { EnvironmentStorageService } from '../../service/EnvironmentStorageService';
    import SideBarItem from './SideBarItem.svelte';

    const envStorage = Container.get(EnvironmentStorageService)

    let ipKeys: string[];
    let topicKeys: string[];

    loadEnvs();
    envStorage.getIPStorage().onListChange().subscribe((newIpKeys) => {
        ipKeys = newIpKeys;
    })
    envStorage.getTopicStorage().onListChange().subscribe((newTopicKeys) => {
        topicKeys = newTopicKeys;
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
    }

    function loadIp(name: string) {
        envStorage.getIPStorage().loadItem(name)
    }

    function loadTopic(name: string) {
        envStorage.getTopicStorage().loadItem(name)
    }

    function removeIP(name: string) {
        envStorage.getIPStorage().deleteItem(name)
    }

    function removeTopic(name: string) {
        envStorage.getTopicStorage().deleteItem(name)
    }

</script>

<div>
    <h2>Sidebar</h2>
    <h3>IPs</h3>
    {#each ipKeys as ipKey}
    <SideBarItem 
        name={ipKey} 
        on:open={() => loadIp(ipKey)}
        on:remove={() => removeIP(ipKey)}>
    </SideBarItem>
    {/each}

    <h3>Topics</h3>
    {#each topicKeys as topicKey}
    <SideBarItem 
        name={topicKey} 
        on:open={() => loadTopic(topicKey)}
        on:remove={() => removeTopic(topicKey)}>
    </SideBarItem>
    {/each}
</div>