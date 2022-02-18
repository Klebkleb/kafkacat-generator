<script lang="ts">
import Container from 'typedi';

    import { EnvironmentStorageService } from './service/EnvironmentStorageService';

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
    <table>
        <tr>
            <th>IPs</th>
            <th></th>
            <th></th>
        </tr>
        {#each ipKeys as ipKey, i}
        <tr>
            <td>{ipKey}</td>
            <td><button on:click={() => loadIp(ipKey)}>Load</button></td>
            <td><button on:click={() => removeIP(ipKey)}>Delete</button></td>
        </tr>
        {/each}
    </table>

    <table>
        <tr>
            <th>Topics</th>
            <th></th>
            <th></th>
        </tr>
        {#each topicKeys as topicKey, i}
        <tr>
            <td>{topicKey}</td>
            <td><button on:click={() => loadTopic(topicKey)}>Load</button></td>
            <td><button on:click={() => removeTopic(topicKey)}>Delete</button></td>
        </tr>
        {/each}
    </table>
</div>