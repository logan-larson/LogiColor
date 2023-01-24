<script>
	import Color from './Color.svelte';

	import { dndzone } from 'svelte-dnd-action';

	// import { serSolution } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';

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

	let currentMode = 'daily';

	/*
	mode.subscribe((m) => {
		currentMode = m;
	});

	dailyUserSolution.subscribe((s) => {
		changeColor();
	});

	practiceUserSolution.subscribe((s) => {
		changeColor();
	});
	*/

	changeColor();

	function changeColor() {
		items = [];
		if (color != '') {
			items.push({ id: 0, color: color });
			_dragDisabled = true;
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
			practiceUserSolution.update((s) => {
				s[row * 4 + col] = items[0].color;
				return s;
			});
			/*
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
			*/
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
