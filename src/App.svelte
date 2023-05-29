<script lang="ts">
  import JobList from "./components/JobList.svelte";
  import { minimizeLateness, type Job } from "./lib/minimizingLateness";

  const jobs: Job[] = [
    { id: "6", duration: 2, deadline: 15, start: 0, end: 0 },
    { id: "1", duration: 3, deadline: 6, start: 0, end: 0 },
    { id: "2", duration: 2, deadline: 8, start: 0, end: 0 },
    { id: "3", duration: 1, deadline: 9, start: 0, end: 0 },
    { id: "4", duration: 4, deadline: 9, start: 0, end: 0 },
    { id: "5", duration: 3, deadline: 14, start: 0, end: 0 },
  ];

  minimizeLateness(jobs);
</script>

<main>
  <h1>Organizador de tarefas</h1>

  <div>
    <JobList {jobs} />
  </div>
</main>

<style>
</style>
