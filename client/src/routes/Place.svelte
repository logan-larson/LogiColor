<script>
	import Color from './Color.svelte';

	import { dndzone } from 'svelte-dnd-action';

	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';

	import { dailyGame } from '../stores/game.js';
	import { practiceGame } from '../stores/game.js';

	import { mode } from '../stores/game.js';

	/**
	 * @type {string}
	 */
	export let color;

	/**
	 * @type {number}
	 */
	export let row;

	/**
	 * @type {number}
	 */
	export let col;

	/**
	 * @type { { id: number; color: string }[] }
	 */
	let items = [];

	// If the color is a known color, then disable dragging
	let _dragDisabled = false;

	/**
	 * @type {string | string[]}
	 */
	let currentDailyUnknownColors = [];
	/**
	 * @type {string | string[]}
	 */
	let currentPracticeUnknownColors = [];

	dailyGame.subscribe(
		(game) => (currentDailyUnknownColors = game.unknownColors)
	);
	practiceGame.subscribe(
		(game) => (currentPracticeUnknownColors = game.unknownColors)
	);

	let currentMode = 'daily';

	mode.subscribe((m) => {
		currentMode = m;
	});

	changeColor();

	function changeColor() {
		items = [];
		if (color != '') {
			let _id = getColorId(color);
			items.push({ id: _id, color: color });
			// _dragDisabled = true;
			// /*
			if (
				currentMode == 'daily' &&
				!currentDailyUnknownColors.includes(color)
			) {
				_dragDisabled = true;
			} else if (
				currentMode == 'practice' &&
				!currentPracticeUnknownColors.includes(color)
			) {
				_dragDisabled = true;
			}
			// */
		}
	}

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

	$: options = {
		items,
		dropFromOthersDisabled: items.length != 0,
		dragDisabled: _dragDisabled,
		flipDurationMs: 100,
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

		if (items[0] != undefined && items[0].color != undefined) {
			// Update the users solution to the puzzle
			if (currentMode == 'daily') {
				dailyUserSolution.update((s) => {
					s[row * 4 + col] = items[0].color;
					return s;
				});
			} else if (currentMode == 'practice') {
				practiceUserSolution.update((s) => {
					s[row * 4 + col] = items[0].color;
					return s;
				});
			}
		} else {
			// Update the users solution to the puzzle
			if (currentMode == 'daily') {
				dailyUserSolution.update((s) => {
					s[row * 4 + col] = '';
					return s;
				});
			} else if (currentMode == 'practice') {
				practiceUserSolution.update((s) => {
					s[row * 4 + col] = '';
					return s;
				});
			}
		}
	}
</script>

<div
	style="color: white; background-color: {_dragDisabled ? '#000' : '#898989'}"
	use:dndzone={options}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as color (color.id)}
		<Color color={color.color} />
	{/each}
</div>

<style>
	div {
		width: 10vmax;
		max-width: 100px;
		height: 10vmax;
		max-height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		place-self: center;
		user-select: none;
	}

	@media (max-width: 500px) {
		div {
			font-size: 8px;
		}
	}
</style>
