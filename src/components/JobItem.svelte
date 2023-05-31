<script lang="ts">
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import type { Job } from '../lib/minimizeLateness';
    import {
        daysToMilisecs,
        formatDate,
        intervalFromDates,
    } from '../lib/dateUtils';
    import { slide } from 'svelte/transition';
    import { Button, Grid } from '@svelteuidev/core';
    import { Trash } from 'radix-icons-svelte';

    export let job: Job;
    export let onDeadlineChange: () => void;
    export let onDelete: (jobId: string) => void;

    const locale = localeFromDateFnsLocale(ptBR);
    $: deadline = new Date(job.deadline);
    $: start = new Date(job.start);
    $: end = new Date(job.end);
    $: interval = intervalFromDates(start, end);
    $: delay = `${Math.round(job.delay / daysToMilisecs)} dias`;

    console.log(job.id, job.delay);
    function handleDeadlineChange() {
        // deadline = deadline.getTime();
        job.deadline = deadline.getTime();
        onDeadlineChange();
        console.log('antes', job.id, job.delay);
        job = job;
        console.log('depois', job.id, job.delay);
        // start = new Date(job.start);
        // end = new Date(job.end);
        // interval = intervalFromDates(start, end);
    }
</script>

<div in:slide>
    <Grid>
        <Grid.Col span={1}>
            <Button size={24} color="red" on:click={() => onDelete(job.id)}>
                <Trash size={18} />
            </Button>
        </Grid.Col>
        <Grid.Col span={1}>
            <span> {formatDate(start)} </span>
        </Grid.Col>
        <Grid.Col span={1}>
            <span> {formatDate(end)} </span>
        </Grid.Col>
        <Grid.Col span={1}>
            <DateInput
                browseWithoutSelecting
                class="inline"
                bind:value={deadline}
                on:select={handleDeadlineChange}
                format="dd / MM / yyyy"
                {locale}
            />
        </Grid.Col>

        <Grid.Col span={1}>
            <span> {interval} </span>
        </Grid.Col>
        <Grid.Col span={1}>{delay}</Grid.Col>
        <Grid.Col span={6}>
            <span> {job.id} </span>
        </Grid.Col>
    </Grid>
</div>

<style>
    div {
        position: relative;
        padding: 12px 0;
    }

    :global(div .date-time-field.inline) {
        display: inline;
    }

    :global(div .date-time-field.inline.picker) {
        display: inline;
        position: relative;
        z-index: 10;
        background-color: red;
    }

    :global(div .date-time-field.inline input) {
        background: transparent;
        color: white;
        width: 100%;
        padding: 0;
    }
</style>
