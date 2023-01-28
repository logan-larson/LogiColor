<script>
	import Color from './Color.svelte';

	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	import { dailyGame } from '../stores/game.js';
	import { practiceGame } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';
	import { isCorrectSolutionOverlayOpen } from '../stores/overlay';
	import { isIncorrectSolutionOverlayOpen } from '../stores/overlay';
	import { mode } from '../stores/game.js';
	import { practiceGameState } from '../stores/game.js';
	import { dailyGameState } from '../stores/game.js';
	import { practiceColorsInTray } from '../stores/game.js';
	import { dailyColorsInTray } from '../stores/game.js';

	let dailyItems = [
		{ id: 0, color: 'EMERALD' },
		{ id: 1, color: 'TEAL' },
		{ id: 2, color: 'MUSTARD' },
		{ id: 3, color: 'CORAL' },
		{ id: 4, color: 'COBALT' },
		{ id: 5, color: 'PURPLE' },
	];

	let practiceItems = [
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
	let currentPracticeGame;

	/**
	 * @type { {puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
	 */
	let currentDailyGame;

	practiceColorsInTray.subscribe((c) => (practiceItems = c));

	dailyColorsInTray.subscribe((c) => (dailyItems = c));

	let currentMode = '';

	mode.subscribe((m) => {
		currentMode = m;
	});

	/**
	 * @type { string[] }
	 */
	let _practiceUserSolution = [];

	practiceUserSolution.subscribe((s) => (_practiceUserSolution = s));

	practiceGame.subscribe((g) => {
		currentPracticeGame = g;

		if (
			currentPracticeGame != undefined &&
			practiceItems.length === 0 &&
			$practiceGameState != 'solved' &&
			$practiceGameState != 'unsolved'
		) {
			// New game, reset tray
			practiceItems = [];
			practiceColorsInTray.set([]);

			currentPracticeGame.unknownColors.forEach((c, i) => {
				let _id = getColorId(c);
				practiceItems.push({ id: _id, color: c });
			});
			practiceColorsInTray.set(practiceItems);
		}
	});

	/**
	 * @type { string[] }
	 */
	let _dailyUserSolution = [];

	dailyUserSolution.subscribe((s) => (_dailyUserSolution = s));

	dailyGame.subscribe((g) => {
		currentDailyGame = g;

		if (
			currentDailyGame != undefined &&
			dailyItems.length === 0 &&
			$dailyGameState != 'solved' &&
			$dailyGameState != 'unsolved'
		) {
			dailyItems = [];
			dailyColorsInTray.set([]);

			currentDailyGame.unknownColors.forEach((c, i) => {
				let _id = getColorId(c);
				dailyItems.push({ id: _id, color: c });
			});
			dailyColorsInTray.set(dailyItems);
		}
	});

	/**
	 *
	 * @param {string} color
	 */
	function getColorId(color) {
		switch (color) {
			case 'BLACK':
				return 0;
			case 'TEAL':
				return 1;
			case 'ORANGE':
				return 2;
			case 'MINT':
				return 3;
			case 'EMERALD':
				return 4;
			case 'MAGENTA':
				return 5;
			case 'MUSTARD':
				return 6;
			case 'PURPLE':
				return 7;
			case 'BROWN':
				return 8;
			case 'WHITE':
				return 9;
			case 'CORAL':
				return 10;
			case 'COBALT':
				return 11;
			default:
				return -1;
		}
	}

	const flipDurationMs = 300;

	$: dailyOptions = {
		items: dailyItems,
		flipDurationMs,
		centreDraggedOnCursor: true,
		morphDisabled: true,
	};

	$: practiceOptions = {
		items: practiceItems,
		flipDurationMs,
		centreDraggedOnCursor: true,
		morphDisabled: true,
	};

	/**
	 * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
	 */
	function handleDndConsider(e) {
		if (currentMode == 'practice') {
			practiceItems = e.detail.items;
		} else if (currentMode == 'daily') {
			dailyItems = e.detail.items;
		}
	}

	/**
	 * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
	 */
	function handleDndFinalize(e) {
		if (currentMode == 'practice') {
			practiceItems = e.detail.items;

			practiceColorsInTray.set(practiceItems);
			if (practiceItems.length == 0) {
				let isEqual = _practiceUserSolution.every(
					(value, index) => value === currentPracticeGame.solution[index]
				);

				if (isEqual) {
					isCorrectSolutionOverlayOpen.set(true);
					practiceGameState.set('solved');
				} else {
					isIncorrectSolutionOverlayOpen.set(true);
					practiceGameState.set('unsolved');
				}
			}
		} else if (currentMode == 'daily') {
			dailyItems = e.detail.items;

			dailyColorsInTray.set(dailyItems);
			if (dailyItems.length == 0) {
				let isEqual = _dailyUserSolution.every(
					(value, index) => value === currentDailyGame.solution[index]
				);

				if (isEqual) {
					isCorrectSolutionOverlayOpen.set(true);
					dailyGameState.set('solved');
				} else {
					isIncorrectSolutionOverlayOpen.set(true);
					dailyGameState.set('unsolved');
				}
			}
		}
	}
</script>

{#if currentMode == 'practice'}
	<div
		id="container"
		use:dndzone={practiceOptions}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#if currentPracticeGame != undefined}
			{#each practiceItems as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Color color={item.color} />
				</div>
			{/each}
		{/if}
	</div>
{:else if currentMode == 'daily'}
	<div
		id="container"
		use:dndzone={dailyOptions}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#if currentDailyGame != undefined}
			{#each dailyItems as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Color color={item.color} />
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	#container {
		margin-top: 20px;
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
