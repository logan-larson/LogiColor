<script>
  import {
    practiceGame,
    dailyGame,
    mode,
    practiceGameState,
    dailyGameState,
  } from '../stores/game.js';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';

  /**
   * @type { string[] }
   */
  let currentGame = [];

  let currentMode = '';

  mode.subscribe((m) => (currentMode = m));

  practiceGame.subscribe((g) => {
    if (currentMode == 'practice') {
      if (g != undefined) {
        currentGame = g.puzzle;
      } else {
        currentGame = [];
      }
    }
  });

  dailyGame.subscribe((g) => {
    if (currentMode == 'daily') {
      if (g != undefined) {
        currentGame = g.puzzle;
      } else {
        currentGame = [];
      }
    }
  });

  function play() {
    isNewGameOverlayOpen.set(false);
    if (currentMode === 'practice') {
      practiceGameState.set('playing');
    } else if (currentMode === 'daily') {
      dailyGameState.set('playing');
    }
  }

  function isWednesday() {
    const today = new Date();
    return today.getDay() === 3;
  }
</script>

<div class="overlay">
  <div class="container">
    {#if currentMode === 'practice'}
      <h1>Practice</h1>
    {:else if currentMode === 'daily'}
      {#if isWednesday()}
        <h1>Wild Wednesday!</h1>
      {:else}
        <h1>Daily</h1>
      {/if}
    {/if}
    {#if currentGame.length === 0}
      <h1>Please wait while we cook up your puzzle...</h1>
    {:else}
      <h1>Ready to play?</h1>
      <button on:click={play}>I'm ready</button>
    {/if}
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
    justify-content: center;
    align-items: center;
    z-index: 20;
  }

  .container {
    width: 50vw;
    height: 20vh;
    color: white;
    border-radius: 12px;
    padding: 8px 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 800px) {
    .container {
      width: 90vw;
    }
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
