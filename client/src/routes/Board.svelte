<script>
	import Place from './Place.svelte';
	import { game } from '../stores/game.js';
	import { userSolution } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';
	import { mode } from '../stores/game.js';
	import { knownColors } from '../stores/game.js';

	/*
	let currentMode = 'daily';

	mode.subscribe((m) => {
		currentMode = m;
	});

	let places = ['', '', '', '', '', '', '', '', '', '', '', ''];

	*/
	/**
	 * @type {string[] | undefined}
	 */
	/*
	let currentUserSolution = undefined;

	dailyUserSolution.subscribe((u) => {
		if (currentMode == 'daily') {
			currentUserSolution = u;
		}
	});

	practiceUserSolution.subscribe((u) => {
		if (currentMode == 'practice') {
			currentUserSolution = u;
		}
	});
	*/

	/**
	 * @type {string[] | undefined}
	 */
	let currentGame;

	/**
	 * @type {string[] | undefined}
	 */
	let currentUserSolution = undefined;

	let places = ['', '', '', '', '', '', '', '', '', '', '', ''];

	game.subscribe((game) => {
		if (game == undefined) {
			currentGame = undefined;
			return;
		}

		currentGame = game.puzzle;
		knownColors.set([]);

		for (let c of game.puzzle) {
			if (c != '') {
				knownColors.update((colors) => {
					//colors.push(c);
					return colors;
				});
			}
		}

		if (currentGame != undefined) {
			userSolution.set(currentGame);
		}
	});
</script>

<div id="container">
	<div id="board">
		{#if currentGame != undefined}
			{#each currentGame as color, i}
				<Place {color} row={Math.floor(i / 4)} col={i % 4} />
			{/each}
		{:else}
			{#each places as color, i}
				<Place {color} row={Math.floor(i / 4)} col={i % 4} />
			{/each}
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
