<script lang="ts">
    import JobItem from './JobItem.svelte';
    import { minimizeLateness, type Job } from '../lib/minimizingLateness';
    import { Input, Button, Grid, Alert, NumberInput } from '@svelteuidev/core';
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import { daysToMilisecs } from '../lib/dateUtils';
    import { InfoCircled } from 'radix-icons-svelte';
    import { slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    export let globalStartTimestamp: number;
    export let jobs: Job[] = [];
    let jobId = '';
    let deadline = new Date();
    let durationInDays = 1;
    let locale = localeFromDateFnsLocale(ptBR);
    let showAlert = false;

    function handleAddJob() {
        if (jobId.length === 0) {
            showAlert = true;
            return;
        }

        console.log(deadline, durationInDays, durationInDays * daysToMilisecs);

        showAlert = false;
        const job: Job = {
            id: jobId,
            deadline: deadline.getTime(),
            duration: durationInDays * daysToMilisecs,
            start: 0,
            end: 0,
        };

        // TODO: animar reordenação
        // https://svelte.dev/repl/cd4d1bc127834d11812b1d156a60cdd7?version=3.20.1
        minimizeLateness(jobs, globalStartTimestamp);
        jobs = [...jobs, job];
        deadline = new Date();
        jobId = '';
    }

    function handleDeadlineChange(a): void {
        minimizeLateness(jobs, globalStartTimestamp);
        jobs = [...jobs];
    }
</script>

<div>
    {#if jobs.length > 0}
        <ul>
            <!-- https://svelte.dev/tutorial/keyed-each-blocks -->
            {#each jobs as job (job.id)}
                <li animate:flip={{ duration: (d) => 45 * Math.sqrt(d) }}>
                    <JobItem onDeadlineChange={handleDeadlineChange} {job} />
                </li>
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
            <NumberInput
                bind:value={durationInDays}
                id="duration"
                placeholder="3 dias"
                min={1}
                max={100}
                step={1}
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
    {#if showAlert}
        <Alert color="orange" icon={InfoCircled}
            >Forneça uma descrição para a tarefa</Alert
        >
        <br />
    {/if}
    <Button on:click={handleAddJob} type="submit">Adicionar</Button>
</div>

<style>
    ul {
        position: relative;
    }

    ul li {
        list-style: none;
    }

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
