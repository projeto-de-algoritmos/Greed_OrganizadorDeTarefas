<script lang="ts">
    import type { Job } from "../lib/minimizingLateness";
    import JobItem from "./JobItem.svelte";
    import { Input, Button, Grid } from "@svelteuidev/core";
    import {DateInput} from 'date-picker-svelte'

    export let jobs: Job[] = [];
    let newJob = ''
    let date = new Date()

    function handleSubmit() {
        console.log({newJob, date});

        // limpar campos
    }
</script>

<div>
    <ul>
        {#each jobs as job}
            <JobItem {job} />
        {/each}
    </ul>

    <Grid className="oi">
        <Grid.Col span={6}>
            <label for="new_job" class="mb-2">Nova tarefa</label>
            <Input bind:value={newJob} type="text" id="new_job" placeholder="TCC 1" required />
        </Grid.Col>
        <Grid.Col span={6}>
            <label for="deadline" class="mb-2">Prazo</label>
            <Input type="datetime-local" id="deadline" required />
            <DateInput  bind:value={date} />
            
        </Grid.Col>
    </Grid>
    <br>
    <Button on:click={handleSubmit} type="submit">Adicionar</Button>
</div>

<style>
.oi {
    background: red;
}
</style>
