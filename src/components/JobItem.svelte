<script lang="ts">
    import type { Job } from "../lib/minimizingLateness";
    
    export let job: Job;
</script>

<div>
    <span> {job.id} </span>
    <input type="datetime">
    <span>Início</span>
    <span>Fim</span>
</div>