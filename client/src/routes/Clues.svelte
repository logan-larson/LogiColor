<script>
	import { practiceGame } from '../stores/game.js';
	import { dailyGame } from '../stores/game.js';
	import { getNewPracticeGame } from '../stores/game.js';
	import { mode } from '../stores/game.js';
	import { dailyGameNumber } from '../stores/game.js';

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
</script>

<div>
	{#if currentMode == 'practice'}
		<button
			id="new-game"
			on:click={() => {
				getNewPracticeGame.set(true);
			}}
			class="click-button">Create New Game</button
		>
	{:else if currentMode == 'daily'}
		<h1>Day {currentDailyGameNumber}</h1>
	{/if}
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

<style>
	div {
		color: #fff;
		display: flex;
		flex-direction: column;
		font-weight: 500;
	}

	ol {
		list-style-type: upper-roman;
		margin: 10px auto;
	}

	li {
		margin: 3px 0px;
		font-size: 20px;
	}

	h1 {
		margin: 10px 0px 0px;
		font-size: 20px;
		text-align: center;
	}

	@media (max-width: 600px) {
		li {
			font-size: 14px;
		}

		h1 {
			font-size: 14px;
		}
	}

	.click-button {
		margin: 10px auto 0px;
		border: none;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		background-color: #6b6b6b;
		color: #d6d6d6;
	}
</style>
