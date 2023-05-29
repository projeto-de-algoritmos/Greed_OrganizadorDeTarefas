<script lang="ts">
    import { minimizeLateness, type Job } from '../lib/minimizingLateness';
    import JobItem from './JobItem.svelte';
    import { Input, Button, Grid } from '@svelteuidev/core';
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import { daysToMilisecs } from '../lib/dateUtils';

    export let jobs: Job[] = [];
    let jobId = '';
    let deadline = new Date();
    let duration = 1;
    let locale = localeFromDateFnsLocale(ptBR);

    function handleSubmit() {
        console.log({ jobId, deadline });

        const job: Job = {
            id: jobId,
            deadline: deadline.getTime(),
            duration: duration * daysToMilisecs,
            start: 0,
            end: 0,
        };

        // TODO: animar reordenação
        // https://svelte.dev/repl/cd4d1bc127834d11812b1d156a60cdd7?version=3.20.1
        jobs.push(job);
        jobs = jobs;
        minimizeLateness(jobs, new Date().getTime());
        jobId = '';
        deadline = new Date();
        console.log(jobs);
    }
</script>

<div>
    {#if jobs.length > 0}
        <ul>
            {#each jobs as job}
                <JobItem {job} />
            {/each}
        </ul>
    {:else}
        Adicione tarefas na lista clicando em Adicionar
    {/if}

    <Grid>
        <Grid.Col span={2}>
            <label for="deadline" class="mb-2">Prazo</label>
            <DateInput
                class="date-input"
                bind:value={deadline}
                format="dd / MM / yyyy"
                {locale}
            />
        </Grid.Col>
        <Grid.Col span={2}>
            <label for="duration" class="mb-2">Duração (dias)</label>
            <Input
                bind:value={duration}
                type="number"
                id="duration"
                placeholder="3 dias"
                required
            />
        </Grid.Col>
        <Grid.Col span={6}>
            <label for="new_job" class="mb-2">Nova tarefa</label>
            <Input
                bind:value={jobId}
                type="text"
                id="new_job"
                placeholder="TCC 1"
                required
            />
        </Grid.Col>
    </Grid>
    <br />
    <Button on:click={handleSubmit} type="submit">Adicionar</Button>
</div>

<style>
    :global(.date-time-field input) {
        border: 1px solid rgb(206, 212, 218);
        background-color: white;
        transition: border-color 100ms ease 0s;
        min-height: 36px;
    }

    :global(.date-time-field.date-input) {
        /* background: red; */
        width: 100%;
    }
</style>
