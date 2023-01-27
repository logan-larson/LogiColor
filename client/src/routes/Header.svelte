<script>
	import {
		practiceColorsInTray,
		practiceGame,
		practiceUserSolution,
	} from '../stores/game.js';
	import { practiceGameState } from '../stores/game.js';
	import { dailyGame } from '../stores/game.js';
	import { dailyGameState } from '../stores/game.js';
	import {
		isCorrectSolutionOverlayOpen,
		isIncorrectSolutionOverlayOpen,
		isNewGameOverlayOpen,
	} from '../stores/overlay.js';
	import { isPauseOverlayOpen } from '../stores/overlay.js';
	import { isHelpOverlayOpen } from '../stores/overlay.js';
	import { mode } from '../stores/game.js';
	import { timeString } from '../stores/game.js';
	import { getNewPracticeGame } from '../stores/game.js';
	import { getDailyGame } from '../stores/game.js';
	import { onMount } from 'svelte';
	import { dailyGameNumber } from '../stores/game.js';
	import { practiceTime } from '../stores/game.js';
	import { dailyTime } from '../stores/game.js';
	import { browser } from '$app/environment';

	let currentMode = 'daily';

	let currentPracticeGameState = 'notStarted';

	let currentPracticeTime = 0;
	let currentDailyTime = 0;

	practiceTime.subscribe((t) => {
		currentPracticeTime = t;
	});

	dailyTime.subscribe((t) => {
		currentDailyTime = t;
	});

	practiceGameState.subscribe((s) => {
		currentPracticeGameState = s;

		if ($mode == 'practice' && currentPracticeGameState == 'solved') {
			timeString.set(formatTime(currentPracticeTime));
		}
	});

	let currentDailyGameState = 'notStarted';

	dailyGameState.subscribe((s) => {
		currentDailyGameState = s;

		if ($mode == 'daily' && currentDailyGameState == 'solved') {
			timeString.set(formatTime(currentDailyTime));
		}
	});

	mode.subscribe(async (m) => {
		currentMode = m;

		if (currentMode == 'practice') {
			if (currentPracticeGameState == 'solved') {
				timeString.set(formatTime(currentPracticeTime));
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentPracticeGameState == 'unsolved') {
				practiceGameState.set('playing');
			}
		} else if (currentMode == 'daily') {
			if (currentDailyGameState == 'solved') {
				timeString.set(formatTime(currentDailyTime));
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentDailyGameState == 'unsolved') {
				dailyGameState.set('playing');
			}
		}
	});

	setInterval(function () {
		if (currentMode == 'practice' && currentPracticeGameState == 'playing') {
			practiceTime.update((n) => n + 1);
		} else if (currentMode == 'daily' && currentDailyGameState == 'playing') {
			dailyTime.update((n) => n + 1);
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

	getDailyGame.subscribe((p) => {
		if (p) {
			getDailyGameFromServer();
			getDailyGame.set(false);
		}
	});

	async function getDailyGameFromServer() {
		dailyGameState.set('loading');

		dailyGame.set({
			puzzle: [],
			solution: [],
			clues: [],
			unknownColors: [],
		});
		isNewGameOverlayOpen.set(true);

		// const res = await fetch('http://localhost:5000/dailygame');
		const res = await fetch('https://logicolor.fun/dailygame');

		const g = await res.json();

		dailyGame.set(g.game);

		dailyGameNumber.set(g.number);

		dailyTime.set(0);
	}

	async function getNewGame() {
		practiceGameState.set('loading');

		practiceUserSolution.set([]);
		practiceColorsInTray.set([]);

		practiceGame.set({
			puzzle: [],
			solution: [],
			clues: [],
			unknownColors: [],
		});
		isNewGameOverlayOpen.set(true);

		// const res = await fetch('http://localhost:5000/newgame');
		const res = await fetch('https://logicolor.fun/newgame');

		const g = await res.json();

		practiceGame.set(g);

		practiceTime.set(0);
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
		//isHelpOverlayOpen.set(true);
		window.open('help.pdf', '_blank');
	}

	onMount(async () => {
		if (currentMode == 'practice') {
			if (currentPracticeGameState == 'paused') {
				pauseGame();
			} else if (currentPracticeGameState == 'solved') {
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentPracticeGameState == 'unsolved') {
				isIncorrectSolutionOverlayOpen.set(true);
			} else if (currentPracticeGameState == 'loading') {
				isNewGameOverlayOpen.set(true);
			}
		} else if (currentMode == 'daily') {
			if (currentDailyGameState == 'paused') {
				pauseGame();
			} else if (currentDailyGameState == 'solved') {
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentDailyGameState == 'unsolved') {
				isIncorrectSolutionOverlayOpen.set(true);
			} else if (currentDailyGameState == 'loading') {
				isNewGameOverlayOpen.set(true);
			}
		}
	});
</script>

<div id="header">
	<!-- Banner -->
	<ins
		id="banner"
		class="adsbygoogle"
		style="display:block; height: 50px;"
		data-ad-client="ca-pub-1159092486699621"
		data-ad-slot="8672468415"
		data-ad-format="auto"
		data-full-width-responsive="true"
	/>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
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
				{formatTime(currentDailyTime)}
			</p>
			{#if currentDailyGameState === 'playing'}
				<button id="pause-button" on:click={pauseGame} class="click-button"
					>Pause</button
				>
			{/if}
		{:else}
			<p>
				{formatTime(currentPracticeTime)}
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
