<script>
	import Color from './Color.svelte';

	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	import { game } from '../stores/game.js';
	import { userSolution } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';
	import { isCorrectSolutionOverlayOpen } from '../stores/overlay';
	import { isIncorrectSolutionOverlayOpen } from '../stores/overlay';
	import { mode } from '../stores/game.js';
	import { practiceGameState } from '../stores/game.js';
	import { dailyGameState } from '../stores/game.js';

	let items = [
		{ id: 0, color: 'EMERALD' },
		{ id: 1, color: 'TEAL' },
		{ id: 2, color: 'MUSTARD' },
		{ id: 3, color: 'CORAL' },
		{ id: 4, color: 'COBALT' },
		{ id: 5, color: 'PURPLE' },
	];

	/**
	 * @type { {puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
	 */
	let currentGame;

	let currentMode = '';

	mode.subscribe((m) => (currentMode = m));

	/**
	 * @type { string[] }
	 */
	let _userSolution = [];

	userSolution.subscribe((s) => (_userSolution = s));

	game.subscribe((g) => {
		currentGame = g;

		if (currentGame != undefined) {
			items = [];
			currentGame.unknownColors.forEach((c, i) =>
				items.push({ id: i, color: c })
			);
		}
	});

	/**
	 * @type { string[] }
	 */
	let _dailyUserSolution = [];

	dailyUserSolution.subscribe((s) => (_dailyUserSolution = s));

	/**
	 * @type { string[] }
	 */
	let _practiceUserSolution = [];

	practiceUserSolution.subscribe((s) => (_practiceUserSolution = s));

	game.subscribe((g) => {
		currentGame = g;

		if (currentGame != undefined) {
			items = [];
			currentGame.unknownColors.forEach((c, i) =>
				items.push({ id: i, color: c })
			);
		}
	});

	const flipDurationMs = 300;

	$: options = {
		items,
		flipDurationMs,
		centreDraggedOnCursor: true,
		morphDisabled: true,
	};

	/**
	 * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
	 */
	function handleDndConsider(e) {
		items = e.detail.items;
	}

	/**
	 * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
	 */
	function handleDndFinalize(e) {
		items = e.detail.items;

		if (items.length == 0) {
			const isEqual = _userSolution.every(
				(value, index) => value === currentGame.solution[index]
			);
			if (isEqual) {
				isCorrectSolutionOverlayOpen.set(true);
				if (currentMode == 'practice') {
					practiceGameState.set('solved');
				} else if (currentMode == 'daily') {
					dailyGameState.set('solved');
				}
			} else {
				isIncorrectSolutionOverlayOpen.set(true);
				if (currentMode == 'practice') {
					practiceGameState.set('unsolved');
				} else if (currentMode == 'daily') {
					dailyGameState.set('unsolved');
				}
			}
		}

		// Check if items is empty
		// If so, check with server if the user's solution is correct
		/*
		let _userSolution =
			currentMode == 'daily' ? _dailyUserSolution : _practiceUserSolution;
		if (items.length == 0) {
			const isEqual = _userSolution.every(
				(value, index) => value === currentGame.solution[index]
			);
			if (isEqual) {
				isCorrectSolutionOverlayOpen.set(true);
				if (currentMode == 'practice') {
					practiceGameState.set('solved');
				} else if (currentMode == 'daily') {
					dailyGameState.set('solved');
				}
			} else {
				isIncorrectSolutionOverlayOpen.set(true);
				if (currentMode == 'practice') {
					practiceGameState.set('unsolved');
				} else if (currentMode == 'daily') {
					dailyGameState.set('unsolved');
				}
			}
		}
		*/
	}
</script>

<div
	id="container"
	use:dndzone={options}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#if currentGame != undefined}
		{#each items as item (item.id)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<Color color={item.color} />
			</div>
		{/each}
	{/if}
</div>

<style>
	#container {
		margin-top: 50px;
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 5px;
		user-select: none;
		height: 20vmin;
		max-height: 100px;
	}

	@media (max-width: 600px) {
		#container {
			margin-top: 20px;
		}
	}
</style>
