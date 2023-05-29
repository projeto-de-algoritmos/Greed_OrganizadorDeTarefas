<script lang="ts">
    import { DateInput, localeFromDateFnsLocale } from "date-picker-svelte";
    import { ptBR } from "date-fns/locale";
    import type { Job } from "../lib/minimizingLateness";
    import { formatDate, intervalFromDates } from "../lib/dateUtils";

    export let job: Job;
    let deadline = new Date(job.deadline * 1000);
    let start = new Date(job.start * 1000);
    let end = new Date(job.end * 1000);

    let interval = intervalFromDates(start, end);

    const locale = localeFromDateFnsLocale(ptBR);
</script>

<div>
    <span> Label {job.id} </span> -
    <span> {formatDate(start)} </span> -
    <span> {interval} </span>

    <DateInput
        class="inline"
        bind:value={deadline}
        format="dd / MM / yyyy"
        {locale}
    />
</div>

<style>
    :global(div .date-time-field.inline) {
        display: inline;
    }

    :global(div .date-time-field.inline input) {
        background: transparent;
        color: white;
    }
</style>
