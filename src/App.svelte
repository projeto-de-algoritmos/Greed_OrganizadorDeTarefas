<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import { minimizeLateness, type Job } from "./lib/minimizingLateness";

  const jobs: Job[] = [
    { id: "6", duration: 2, deadline: 15, start: 0, end: 0 },
    { id: "1", duration: 3, deadline: 6, start: 0, end: 0 },
    { id: "2", duration: 2, deadline: 8, start: 0, end: 0 },
    { id: "3", duration: 1, deadline: 9, start: 0, end: 0 },
    { id: "4", duration: 4, deadline: 9, start: 0, end: 0 },
    { id: "5", duration: 3, deadline: 14, start: 0, end: 0 },
  ];

  minimizeLateness(jobs)

  console.log(jobs);
  
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
