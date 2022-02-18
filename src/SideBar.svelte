<script lang="ts">
import Container from 'typedi';

    import { EnvironmentStorageService } from './service/EnvironmentStorageService';

    const envStorage = Container.get(EnvironmentStorageService)

    let environments: string[];

    loadEnvs();
    envStorage.getEnvironmentStorage().onListChange().subscribe((val) => {
        console.log('getting')
        environments = val;
    })

    function loadEnvs() {
        environments = envStorage.getEnvironmentStorage().loadKeys()
        if(!environments) {
            environments = [];
        }
    }

    function remove(name: string) {
        envStorage.getEnvironmentStorage().deleteItem(name)
        loadEnvs();
    }

</script>

<div>
    <h2>Sidebar</h2>
    <h3>Envs</h3>
    <table>
        <tr>
            <th>Environment</th>
            <th></th>
            <th><button on:click={loadEnvs}>Reload</button></th>
        </tr>
        {#each environments as env, i}
        <tr>
            <td>{env}</td>
            <td>load</td>
            <td><button on:click={() => remove("test")}>Delete</button></td>
        </tr>
        {/each}
    </table>
</div>