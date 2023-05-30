<script lang="ts">
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import type { Job } from '../lib/minimizingLateness';
    import { formatDate, intervalFromDates } from '../lib/dateUtils';
    import { slide } from 'svelte/transition';

    export let job: Job;
    export let onDeadlineChange: (a) => void;

    let deadline = new Date(job.deadline);
    let start = new Date(job.start);
    let end = new Date(job.end);
    let interval = intervalFromDates(start, end);
    const locale = localeFromDateFnsLocale(ptBR);

    function handleDeadlineChange(ev: CustomEvent) {
        job.deadline = deadline.getTime();
        onDeadlineChange(ev);
    }
</script>

<div in:slide>
    <span> {formatDate(start)} </span>
    <DateInput
        browseWithoutSelecting
        class="inline"
        bind:value={deadline}
        on:select={handleDeadlineChange}
        format="dd / MM / yyyy"
        {locale}
    />
    (<span> {interval} </span>)
    <span> {job.id} </span>
</div>

<style>
    div {
        position: relative;
        padding: 12px;
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
    }
</style>
