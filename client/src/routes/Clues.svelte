<script>
  import {
    practiceGame,
    dailyGame,
    getNewPracticeGame,
    getNewHardPracticeGame,
    getDailyGame,
    mode,
    dailyGameNumber,
    dailyGameState, seed,
    practiceMode,
  } from '../stores/game.js';

  let currentMode = 'daily';

  mode.subscribe(async (m) => {
    currentMode = m;
  });

  /**
   * @type { { puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
   */
  let currentPracticeGame;

  /**
   * @type { { puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
   */
  let currentDailyGame;

  practiceGame.subscribe((g) => {
    currentPracticeGame = g;
  });

  dailyGame.subscribe((g) => {
    currentDailyGame = g;
  });

  let currentDailyGameNumber = 0;

  dailyGameNumber.subscribe((n) => {
    currentDailyGameNumber = n;
  });

  let currentDailyGameState = 'loading';

  dailyGameState.subscribe((s) => {
    currentDailyGameState = s;
  });
</script>

<div class="container">
	<div class="new-games-container">
		{#if currentMode == 'practice'}
			<!-- <div class="new-games-container"> -->
			<button
				id="new-practice-game"
				on:click={() => {
					seed.set(-1);
					window.history.replaceState({}, 'LogiColor', '/');
					getNewPracticeGame.set(true);
				}}
				class="click-button">Create New Game</button
			>
			<button
				id="new-hard-game"
				on:click={() => {
					seed.set(-1);
					window.history.replaceState({}, 'LogiColor', '/');
					getNewHardPracticeGame.set(true);
				}}
				class="click-button">Create New Hard Game</button
			>
			<!-- </div> -->
		{:else if currentMode == 'daily'}
			{#if currentDailyGameState == 'notStarted'}
				<button
					id="new-daily-game"
					on:click={() => {
						getDailyGame.set(true);
					}}
					class="click-button">Play Daily Game</button
				>
			{:else}
				<h1>Day {currentDailyGameNumber}</h1>
			{/if}
		{/if}
	</div>
	<div class="clues-container">
		<ol>
			{#if currentMode == 'practice' && currentPracticeGame != undefined}
				{#each currentPracticeGame.clues as clue}
					<li>{clue}</li>
				{/each}
			{:else if currentMode == 'daily' && currentDailyGame != undefined}
				{#each currentDailyGame.clues as clue}
					<li>{clue}</li>
				{/each}
			{/if}
		</ol>
	</div>
</div>

<style>
  .container {
    color: #fff;
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }

  .new-games-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .clues-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ol {
    list-style-type: upper-roman;
  }

  li {
    margin: 3px 0px;
    font-size: max(12px, 2.5vmin);
  }

  h1 {
    margin: 10px 0px 0px;
    font-size: 20px;
    text-align: center;
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 16px;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 14px;
    }
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
</style>
