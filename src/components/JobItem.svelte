<script lang="ts">
    import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
    import { ptBR } from 'date-fns/locale';
    import type { Job } from '../lib/minimizingLateness';
    import { formatDate, intervalFromDates } from '../lib/dateUtils';

    export let job: Job;

    let deadline = new Date(job.deadline);
    let start = new Date(job.start);
    let end = new Date(job.end);
    let interval = intervalFromDates(start, end);
    const locale = localeFromDateFnsLocale(ptBR);
</script>

<div>
    <DateInput
        browseWithoutSelecting
        class="inline"
        bind:value={deadline}
        format="dd / MM / yyyy"
        {locale}
    />
    <span> {formatDate(start)} </span>
    (<span> {interval} </span>)
    <span> {job.id} </span>
</div>

<style>
    div {
        /* border: 1px solid red; */
        padding: 12px;
    }

    :global(div .date-time-field.inline) {
        display: inline;
    }

    :global(div .date-time-field.inline input) {
        background: transparent;
        color: white;
    }
</style>
