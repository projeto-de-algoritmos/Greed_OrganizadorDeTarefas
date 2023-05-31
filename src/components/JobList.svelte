<script lang="ts">
    import JobItem from './JobItem.svelte';
    import { minimizeLateness, type Job } from '../lib/minimizeLateness';
    import { Input, Button, Grid, NumberInput } from '@svelteuidev/core';
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import { daysToMilisecs } from '../lib/dateUtils';
    import { flip } from 'svelte/animate';

    export let globalStartTimestamp: number;
    export let jobs: Job[] = [];
    let jobId = '';
    let deadline = new Date();
    let durationInDays = 1;
    let locale = localeFromDateFnsLocale(ptBR);

    function handleAddJob() {
        if (jobId.length === 0) {
            alert('Não use tarefas repetidas');
            return;
        }

        const repeatedJob = jobs.find((j) => j.id === jobId);
        if (repeatedJob) {
            alert('Não use tarefas repetidas');
            return;
        }

        const job: Job = {
            id: jobId,
            deadline: deadline.getTime(),
            duration: durationInDays * daysToMilisecs,
            start: 0,
            end: 0,
            delay: 0,
        };

        // TODO: animar reordenação
        // https://svelte.dev/repl/cd4d1bc127834d11812b1d156a60cdd7?version=3.20.1
        jobs.push(job);
        minimizeLateness(jobs, globalStartTimestamp);
        jobs = jobs;

        deadline = new Date();
        jobId = '';
    }

    function handleDeleteJob(jobId: string) {
        const remainingJobs = jobs.filter((j) => j.id !== jobId);
        minimizeLateness(jobs, globalStartTimestamp);
        jobs = remainingJobs;
    }

    function handleDeadlineChange(): void {
        minimizeLateness(jobs, globalStartTimestamp);
        jobs = jobs;
    }
</script>

<div>
    {#if jobs.length > 0}
        <Grid>
            <Grid.Col span={1} />
            <Grid.Col span={1}>
                <strong>Início</strong>
            </Grid.Col>
            <Grid.Col span={1}>
                <strong>Fim</strong>
            </Grid.Col>
            <Grid.Col span={1}>
                <strong>Prazo</strong>
            </Grid.Col>
            <Grid.Col span={1}>
                <strong>Duração</strong>
            </Grid.Col>
            <Grid.Col span={1}>
                <strong>Atraso</strong>
            </Grid.Col>
            <Grid.Col span={6}>
                <strong>Tarefa</strong>
            </Grid.Col>
        </Grid>
        <ul>
            <!-- https://svelte.dev/tutorial/keyed-each-blocks -->
            {#each jobs as job (job)}
                <li animate:flip={{ duration: (d) => 45 * Math.sqrt(d) }}>
                    <JobItem
                        onDelete={handleDeleteJob}
                        onDeadlineChange={handleDeadlineChange}
                        {job}
                    />
                </li>
            {/each}
        </ul>
    {:else}
        <p>Adicione tarefas na lista clicando em Adicionar</p>
        <br />
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
    <Button on:click={handleAddJob} type="submit">Adicionar</Button>
</div>

<style>
    ul {
        position: relative;
        padding: 0;
    }

    ul li {
        list-style: none;
        display: grid;
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
