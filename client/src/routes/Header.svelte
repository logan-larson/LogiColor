<script>
  import { game } from '../stores/game.js';

  let currentGame;

  game.subscribe((g) => (currentGame = g));

  let mode = 'daily';
  let time = 34256;
  let isPaused = true;

  function setDaily() {
    mode = 'daily';
  }

  function setPractice() {
    mode = 'practice';
  }

  async function getNewGame() {
    const res = await fetch('http://localhost:3000/newgame');

    const g = await res.json();

    game.set(g);
  }

  function changeIsPaused() {
    isPaused = !isPaused;
  }
</script>

<div id="header">
  <div id="mode">
    <button on:click={setDaily} class={mode == 'daily' ? 'selected' : ''}
      >Daily</button
    >
    <button on:click={setPractice} class={mode == 'practice' ? 'selected' : ''}
      >Practice</button
    >
    {#if mode == 'practice'}
      <button on:click={getNewGame}>Create New Game</button>
    {/if}
  </div>
  <div id="timer">
    <p>
      {Math.trunc(Math.floor(time / 60000))}:{Math.floor((time % 60000) / 1000)}
    </p>
    {#if isPaused}
      <button on:click={changeIsPaused}>Play</button>
    {:else}
      <button on:click={changeIsPaused}>Pause</button>
    {/if}
  </div>
  <div id="stats">
    <button>Stats</button>
  </div>
</div>

<style>
  #header {
    background-color: #2e2f2f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    color: #fff;
  }

  #timer {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  #timer button {
    height: 25px;
    width: 60px;
  }

  #stats {
    display: flex;
  }

  .selected {
    background-color: #898989;
  }
</style>
