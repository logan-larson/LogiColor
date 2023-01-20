<script>
  import { game } from '../stores/game.js';
  import { practiceGameState } from '../stores/game.js';
  import { dailyGameState } from '../stores/game.js';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';
  import { isPauseOverlayOpen } from '../stores/overlay.js';
  import { isHelpOverlayOpen } from '../stores/overlay.js';
  import { mode } from '../stores/game.js';
  import { timeString } from '../stores/game.js';

  let currentGame = [];

  game.subscribe((g) => {
    currentGame = g.clues;
  });

  let currentPracticeGameState = '';
  let currentDailyGameState = '';

  practiceGameState.subscribe((s) => {
    currentPracticeGameState = s;

    if (currentPracticeGameState == 'solved') {
      timeString.set(formatTime(time));
    }
  });

  dailyGameState.subscribe((s) => {
    currentDailyGameState = s;
  });

  let currentMode = 'daily';

  mode.subscribe((m) => {
    currentMode = m;
  });

  let time = 0;

  var timer = setInterval(function() {
    if (currentPracticeGameState == 'playing' || currentDailyGameState == 'playing') {
      time += 1;
    }
  }, 1000);

  function setDaily() {
    mode.set('daily');
  }

  function setPractice() {
    mode.set('practice');
  }

  async function getNewGame() {
    practiceGameState.set('loading');

    game.set({ puzzle: [], solution: [], clues: [], unknownColors: []});
    isNewGameOverlayOpen.set(true);

    // const res = await fetch('http://localhost/newgame');
    const res = await fetch('http://logicolor.fun/newgame');

    console.log(res);

    const g = await res.json();

    console.log(g);

    game.set(g);

    time = 0;
  }

  /**
	 * @param {number} t
	 */
  function formatTime(t) {
    var date = new Date(0);
    date.setSeconds(t);
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
  }

  function pauseGame() {
    practiceGameState.set('paused');
    isPauseOverlayOpen.set(true);
  }

  function openHelp() {
    isHelpOverlayOpen.set(true);
  }
</script>

<div id="header">
  <div id="mode">
    <button id="daily" on:click={setDaily} class={currentMode == 'daily' ? 'toggle-button selected' : 'toggle-button not-selected'}>
      Daily
    </button>
    <button id="practice" on:click={setPractice} class={currentMode == 'practice' ? 'toggle-button selected' : 'toggle-button not-selected'}>
      Practice
    </button>
  </div>
  <div id="timer">
    {#if currentPracticeGameState !== 'playing' && currentMode == 'practice'}
      <button id="new-game" on:click={getNewGame} class="click-button ">Create New Game</button>
    {:else}
      <p>
        {formatTime(time)}
        <!--{Math.trunc(Math.floor(time / 60000))}:{Math.floor((time % 60000) / 1000)}-->
      </p>
      <button id="pause-button" on:click={pauseGame} class="click-button">Pause</button>
    {/if}
  </div>
  <div id="stats">
    <button class="click-button" on:click={openHelp}>Help</button>
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
  
  .click-button {
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    background-color: #6b6b6b;
    color: #d6d6d6;
  }

  .click-button:hover {
    background-color: #575757;
    color: #fff;
  }

  @media (max-width: 600px) {
    .toggle-button {
      padding: 7px;
      font-size: 12px;
    }

    .click-button {
      padding: 7px;
      font-size: 12px;
    }
  }

  .toggle-button {
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .selected {
    background-color: #6b6b6b;
    color: #fff;
  }

  .not-selected {
    background-color: #2e2f2f;
    color: #d6d6d6;
  }

</style>
