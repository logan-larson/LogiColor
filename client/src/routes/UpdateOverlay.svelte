<script>
  import {
    isUpdateOverlayOpen,
    version,
    firstTime,
  } from '../stores/overlay.js';
  import { onMount } from 'svelte';

  /**
   * @type {any[]}
   */
  let updates = [];

  function close() {
    isUpdateOverlayOpen.set(false);
  }

  onMount(async () => {
    if ($firstTime) {
      close();
      return;
    }

    const res = await fetch(`/updates`);
    const data = await res.json();

    updates = data;
  });
</script>

<div class="overlay">
  <div class="container">
    {#each updates as update}
      <div class="update">
        <h1>{update.title}</h1>
        <h2>{update.date}</h2>
        <ul>
          {#each update.notes as note}
            <li>{note}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
  <div class="button-div">
    <button on:click={close}>Close</button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    background-color: #252524;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .container {
    width: 70vw;
    height: 100vh;
    color: white;
    border-radius: 12px;
    padding: 8px 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .container::-webkit-scrollbar {
    width: 0px;
  }

  @media (max-width: 800px) {
    .container {
      width: 90vw;
    }
  }

  .update {
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
  }

  li {
    margin: 10px 0px;
  }

  .button-div {
    position: sticky;
    bottom: 0;
    height: 80px;
    background-color: #252524;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    background-color: #6b6b6b;
    color: #d6d6d6;
  }

  button:hover {
    background-color: #575757;
    color: #fff;
  }
</style>
