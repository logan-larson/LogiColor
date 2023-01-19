<script>
  import { game } from '../stores/game.js';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';
  import { isPauseOverlayOpen } from '../stores/overlay.js';

  let currentGame = [];

  game.subscribe((g) => {
    currentGame = g.clues;
  });

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
    game.set({ puzzle: [], solution: [], clues: [], unknownColors: []});
    isNewGameOverlayOpen.set(true);

    const res = await fetch('http://localhost:3000/newgame');

    const g = await res.json();

    game.set(g);
  }

  function changeIsPaused() {
    isPauseOverlayOpen.set(true);
  }
</script>

<div id="header">
  <div id="mode">
    <button id="daily" on:click={setDaily} class={mode == 'daily' ? 'selected' : 'not-selected'}>
      Daily
    </button>
    <button id="practice" on:click={setPractice} class={mode == 'practice' ? 'selected' : 'not-selected'}>
      Practice
    </button>
  </div>
  <div id="timer">
    {#if currentGame.length === 0 && mode == 'practice'}
      <button id="new-game" on:click={getNewGame}>Create New Game</button>
    {:else}
      <p>
        {Math.trunc(Math.floor(time / 60000))}:{Math.floor((time % 60000) / 1000)}
      </p>
      {#if isPaused}
        <button on:click={changeIsPaused}>Play</button>
      {:else}
        <button on:click={changeIsPaused}>Pause</button>
      {/if}
    {/if}
  </div>
  <div id="stats">
    <button>Stats</button>
  </div>
</div>

<style>
  #header {
    background-color: #2e2f2f;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    padding: 8px;
    color: #fff;
  }

  #mode {
    display: flex;
    align-items: center;
  }

  #timer {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  #timer p {
    margin: 0px 10px;
  }

  #stats {
    display: flex;
  }
  
  #daily {
    border: none;
    padding: 10px;
    border-radius: 8px 0px 0px 8px;
    margin-right: 0px;
    cursor: pointer;
  }

  #practice {
    border: none;
    padding: 10px;
    border-radius: 0px 8px 8px 0px;
    cursor: pointer;
  }

  .selected {
    background-color: #6b6b6b;
  }

  .not-selected {
    background-color: #898989;
  }

  #new-game {
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #898989;
  }
</style>
