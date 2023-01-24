<script>
	import { practiceGame } from '../stores/game.js';
	import { getNewPracticeGame } from '../stores/game.js';
	import { mode } from '../stores/game.js';

	let currentMode = 'daily';

	mode.subscribe(async (m) => {
		currentMode = m;
	});

	/**
	 * @type { { puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
	 */
	let currentGame;

	practiceGame.subscribe((g) => {
		currentGame = g;
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
	{/if}
	<ol>
		{#if currentGame != undefined}
			{#each currentGame.clues as clue}
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

	@media (max-width: 600px) {
		li {
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
