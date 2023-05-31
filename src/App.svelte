<script lang="ts">
  import JobList from './components/JobList.svelte';
  import { daysToMilisecs } from './lib/dateUtils';
  import { minimizeLateness, type Job } from './lib/minimizeLateness';

  const globalStartTimestamp = new Date().getTime();
  let jobs: Job[] = [
    {
      // 1
      id: 'TCC 1',
      duration: 3 * daysToMilisecs,
      deadline: new Date('2023-07-06T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
    {
      // 2
      id: 'artigo usabilidade',
      duration: 2 * daysToMilisecs,
      deadline: new Date('2023-07-08T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
    {
      // 3
      id: 'Trabalho de Testes',
      duration: 1 * daysToMilisecs,
      deadline: new Date('2023-07-09T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
    {
      // 4
      id: 'declaração imposto de renda',
      duration: 4 * daysToMilisecs,
      deadline: new Date('2023-07-09T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
    {
      // 5
      id: 'outra coisa',
      duration: 3 * daysToMilisecs,
      deadline: new Date('2023-07-14T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
    {
      // 6
      id: 'PA T2',
      duration: 2 * daysToMilisecs,
      deadline: new Date('2023-07-15T23:59:59').getTime(),
      start: 0,
      end: 0,
      delay: 0,
    },
  ];

  minimizeLateness(jobs, globalStartTimestamp);
</script>

<main>
  <h1>Organizador de tarefas</h1>

  <JobList {jobs} {globalStartTimestamp} />
</main>

<style>
</style>
