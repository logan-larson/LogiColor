<script>
	import { dailyGame } from '../stores/game.js';
	import { practiceGame } from '../stores/game.js';
	import { dailyUserSolution } from '../stores/game.js';
	import { practiceUserSolution } from '../stores/game.js';
	import { practiceGameState } from '../stores/game.js';
	import { dailyGameState } from '../stores/game.js';
	import { isNewGameOverlayOpen } from '../stores/overlay.js';
	import { isPauseOverlayOpen } from '../stores/overlay.js';
	import { isHelpOverlayOpen } from '../stores/overlay.js';
	import { mode } from '../stores/game.js';
	import { timeString } from '../stores/game.js';
	import { getNewPracticeGame } from '../stores/game.js';

	let currentMode = 'daily';

	/**
	 * @type { { puzzle: string[], solution: string[], clues: string[], unknownColors: string[] } | never[] }
	 */
	let currentGame = [];

	practiceGame.subscribe((g) => {
		if (currentMode == 'practice') {
			currentGame = g;
		}
	});

	dailyGame.subscribe((g) => {
		if (currentMode == 'daily') {
			currentGame = g;
		}
	});

	/**
	 * @type {string[]}
	 */
	let currentDailyUserSolution = [];

	dailyUserSolution.subscribe((u) => {
		currentDailyUserSolution = u;
	});

	/**
	 * @type {string[]}
	 */
	let currentPracticeUserSolution = [];

	practiceUserSolution.subscribe((u) => {
		currentPracticeUserSolution = u;
	});

	let currentPracticeGameState = '';

	practiceGameState.subscribe((s) => {
		currentPracticeGameState = s;

		if (currentPracticeGameState == 'solved') {
			timeString.set(formatTime(practiceTime));
		}
	});

	let currentDailyGameState = 'notStarted';

	dailyGameState.subscribe((s) => {
		currentDailyGameState = s;

		if (currentDailyGameState == 'solved') {
			timeString.set(formatTime(dailyTime));
		}
	});

	mode.subscribe(async (m) => {
		// If the user is currently playing a game, pause it
		if (currentMode == 'practice' && currentPracticeGameState == 'playing') {
			practiceGameState.set('paused');
		} else if (currentMode == 'daily' && currentDailyGameState == 'playing') {
			dailyGameState.set('paused');
		}

		currentMode = m;

		// Resume the current game if it was paused
		if (currentMode == 'practice' && currentPracticeGameState == 'paused') {
			practiceGameState.set('playing');
		} else if (currentMode == 'daily' && currentDailyGameState == 'paused') {
			dailyGameState.set('playing');
		}
	});

	let practiceTime = 0;
	let dailyTime = 0;

	var timer = setInterval(function () {
		if (currentPracticeGameState == 'playing') {
			practiceTime += 1;
		} else if (currentDailyGameState == 'playing') {
			dailyTime += 1;
		}
	}, 1000);

	function setDaily() {
		mode.set('daily');
	}

	function setPractice() {
		mode.set('practice');
	}

	getNewPracticeGame.subscribe((p) => {
		if (p) {
			getNewGame();
			getNewPracticeGame.set(false);
		}
	});

	async function getNewGame() {
		practiceGameState.set('loading');

		practiceGame.set({
			puzzle: [],
			solution: [],
			clues: [],
			unknownColors: [],
		});
		isNewGameOverlayOpen.set(true);

		const res = await fetch('http://localhost/newgame');
		// const res = await fetch('http://logicolor.fun/newgame');

		const g = await res.json();

		practiceGame.set(g);
		// practiceUserSolution.set(g.puzzle);

		practiceTime = 0;
	}

	/**
	 * @param {number} t
	 */
	function formatTime(t) {
		var date = new Date(0);
		date.setSeconds(t);
		var timeStr = date.toISOString().substring(14, 19);
		return timeStr;
	}

	function pauseGame() {
		if (currentMode == 'daily') {
			dailyGameState.set('paused');
		} else if (currentMode == 'practice') {
			practiceGameState.set('paused');
		}
		isPauseOverlayOpen.set(true);
	}

	function openHelp() {
		isHelpOverlayOpen.set(true);
	}
</script>

<div id="header">
	<div id="mode">
		<button
			id="daily"
			on:click={setDaily}
			class={currentMode == 'daily'
				? 'toggle-button selected'
				: 'toggle-button not-selected'}
		>
			Daily
		</button>
		<button
			id="practice"
			on:click={setPractice}
			class={currentMode == 'practice'
				? 'toggle-button selected'
				: 'toggle-button not-selected'}
		>
			Practice
		</button>
	</div>
	<div id="timer">
		{#if currentMode === 'daily'}
			<p>
				{formatTime(dailyTime)}
			</p>
			{#if currentDailyGameState === 'playing'}
				<button id="pause-button" on:click={pauseGame} class="click-button"
					>Pause</button
				>
			{/if}
		{:else}
			<p>
				{formatTime(practiceTime)}
			</p>
			{#if currentPracticeGameState === 'playing'}
				<button id="pause-button" on:click={pauseGame} class="click-button"
					>Pause</button
				>
			{/if}
		{/if}
	</div>
	<div id="help">
		<button class="click-button" on:click={openHelp}>Help</button>
	</div>
</div>

<style>
	#header {
		background-color: #2e2f2f;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-items: center;
		align-items: center;
		padding: 8px;
		color: #fff;
	}

	#mode {
		display: flex;
		align-items: center;
	}

	#timer {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	#timer p {
		margin: 0px 10px;
	}

	#help {
		display: flex;
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

	.click-button:hover {
		background-color: #575757;
		color: #fff;
	}

	@media (max-width: 600px) {
		.toggle-button {
			padding: 7px;
			font-size: 12px;
		}

		.click-button {
			padding: 7px;
			font-size: 12px;
		}
	}

	.toggle-button {
		border: none;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
	}

	.selected {
		background-color: #6b6b6b;
		color: #fff;
	}

	.not-selected {
		background-color: #2e2f2f;
		color: #d6d6d6;
	}
</style>
