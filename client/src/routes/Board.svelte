<script>
	import Place from './Place.svelte';
	import { practiceGame } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';
	import { dailyGame } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { mode } from '../stores/game.js';
	import { getDailyGame } from '../stores/game.js';

	/**
	 * @type {string[] | undefined}
	 */
	let currentPracticeGame;

	/**
	 * @type {string[] | undefined}
	 */
	let currentDailyGame;

	let currentMode = 'daily';

	mode.subscribe((m) => {
		currentMode = m;

		// If the mode is daily and the daily game is undefined, then get the daily game
		if (m == 'daily' && currentDailyGame == undefined) {
			getDailyGame.set(true);
		}
	});

	let places = ['', '', '', '', '', '', '', '', '', '', '', ''];

	practiceGame.subscribe((game) => {
		if (currentMode != 'practice') return;

		if (game == undefined) {
			currentPracticeGame = undefined;
			return;
		}

		currentPracticeGame = game.puzzle;

		if (currentPracticeGame != undefined) {
			practiceUserSolution.set(currentPracticeGame);
		}
	});

	dailyGame.subscribe((game) => {
		if (currentMode != 'daily') return;

		if (game == undefined) {
			currentDailyGame = undefined;
			getDailyGame.set(true);
			return;
		}

		currentDailyGame = game.puzzle;

		if (currentDailyGame != undefined) {
			dailyUserSolution.set(currentDailyGame);
		}
	});
</script>

<div id="container">
	<div id="board">
		{#if currentMode == 'practice'}
			{#if currentPracticeGame != undefined}
				{#each currentPracticeGame as color, i}
					<Place {color} row={Math.floor(i / 4)} col={i % 4} />
				{/each}
			{:else}
				{#each places as color, i}
					<Place {color} row={Math.floor(i / 4)} col={i % 4} />
				{/each}
			{/if}
		{:else if currentMode == 'daily'}
			{#if currentDailyGame != undefined}
				{#each currentDailyGame as color, i}
					<Place {color} row={Math.floor(i / 4)} col={i % 4} />
				{/each}
			{:else}
				{#each places as color, i}
					<Place {color} row={Math.floor(i / 4)} col={i % 4} />
				{/each}
			{/if}
		{/if}
	</div>
</div>

<style>
	#container {
		width: full;
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}

	#board {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 10px;
		padding: 5px;
		background-color: #2e2f2f;
		border-radius: 8px;
	}
</style>
