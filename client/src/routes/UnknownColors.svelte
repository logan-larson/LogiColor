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
	let currentPracticeGame;

	/**
	 * @type { {puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
	 */
	let currentDailyGame;

	/**
	 * @type {string[]}
	 */
	let currentPracticeColorsInTray = [];

	practiceColorsInTray.subscribe((c) => (currentPracticeColorsInTray = c));

	/**
	 * @type {string[]}
	 */
	let currentDailyColorsInTray = [];

	dailyColorsInTray.subscribe((c) => (currentDailyColorsInTray = c));

	let currentMode = '';

	mode.subscribe((m) => {
		if (currentMode == 'daily') {
			dailyColorsInTray.set(items.map((i) => i.color));
		} else if (currentMode == 'practice') {
			practiceColorsInTray.set(items.map((i) => i.color));
		}

		currentMode = m;
		items = [];

		if (currentMode == 'practice') {
			currentPracticeColorsInTray.forEach((c, i) =>
				items.push({ id: i, color: c })
			);
		} else if (currentMode == 'daily') {
			currentDailyColorsInTray.forEach((c, i) =>
				items.push({ id: i, color: c })
			);
		}
	});

	/**
	 * @type { string[] }
	 */
	let _practiceUserSolution = [];

	practiceUserSolution.subscribe((s) => (_practiceUserSolution = s));

	practiceGame.subscribe((g) => {
		currentPracticeGame = g;

		if (currentPracticeGame != undefined) {
			items = [];
			currentPracticeGame.unknownColors.forEach((c, i) => {
				let _id = getColorId(c);
				items.push({ id: _id, color: c });
			});
		}
	});

	/**
	 * @type { string[] }
	 */
	let _dailyUserSolution = [];

	dailyUserSolution.subscribe((s) => (_dailyUserSolution = s));

	dailyGame.subscribe((g) => {
		currentDailyGame = g;

		if (currentDailyGame != undefined) {
			items = [];
			currentDailyGame.unknownColors.forEach((c, i) => {
				let _id = getColorId(c);
				items.push({ id: _id, color: c });
			});
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
			let isEqual = false;
			if (currentMode == 'practice') {
				isEqual = _practiceUserSolution.every(
					(value, index) => value === currentPracticeGame.solution[index]
				);
			} else if (currentMode == 'daily') {
				isEqual = _dailyUserSolution.every(
					(value, index) => value === currentDailyGame.solution[index]
				);
			}

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
	}
</script>

<div
	id="container"
	use:dndzone={options}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#if currentMode == 'practice'}
		{#if currentPracticeGame != undefined}
			{#each items as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Color color={item.color} />
				</div>
			{/each}
		{/if}
	{:else if currentMode == 'daily'}
		{#if currentDailyGame != undefined}
			{#each items as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Color color={item.color} />
				</div>
			{/each}
		{/if}
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
