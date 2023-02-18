<script>
	import {
		dailyUserSolution,
		getNewHardPracticeGame,
		practiceColorsInTray,
		practiceGame,
		practiceUserSolution,
	} from '../stores/game.js';
	import { practiceGameState } from '../stores/game.js';
	import { dailyGame } from '../stores/game.js';
	import { dailyGameState, dailyColorsInTray } from '../stores/game.js';
	import {
		isCorrectSolutionOverlayOpen,
		isIncorrectSolutionOverlayOpen,
		isNewGameOverlayOpen,
	} from '../stores/overlay.js';
	import { isPauseOverlayOpen } from '../stores/overlay.js';
	import { isHelpOverlayOpen, firstTime } from '../stores/overlay.js';
	import { mode } from '../stores/game.js';
	import { timeString } from '../stores/game.js';
	import { getNewPracticeGame } from '../stores/game.js';
	import { getDailyGame } from '../stores/game.js';
	import { onMount } from 'svelte';
	import { dailyGameNumber } from '../stores/game.js';
	import { practiceTime } from '../stores/game.js';
	import { dailyTime } from '../stores/game.js';

	let secure = 'https';
	let port = '';

	let logo = '';

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

	getNewHardPracticeGame.subscribe((p) => {
		if (p) {
			getNewGame(true);
			getNewHardPracticeGame.set(false);
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

		dailyUserSolution.set([]);
		dailyColorsInTray.set([]);

		dailyGame.set({
			puzzle: [],
			solution: [],
			clues: [],
			unknownColors: [],
		});
		isNewGameOverlayOpen.set(true);

		const res = await fetch(
			`${secure}://${window.location.hostname}${port}/dailygame`
		);
		//const res = await fetch('https://logicolor.fun/dailygame');

		const g = await res.json();

		dailyGame.set(g.game);

		dailyGameNumber.set(g.number);

		dailyTime.set(0);
	}

	async function getNewGame(isHardMode = false) {
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

		const hardURL = isHardMode ? 'hard' : '';
		const res = await fetch(
			`${secure}://${window.location.hostname}${port}/new${hardURL}game`
		);

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
		secure = window.location.hostname == 'localhost' ? 'http' : 'https';
		port = window.location.hostname == 'localhost' ? ':5000' : '';

		fetch(`${secure}://${window.location.hostname}${port}/logo`)
			.then((res) => res.blob())
			.then((l) => {
				logo = URL.createObjectURL(l);
			});

		if ($firstTime) {
			isHelpOverlayOpen.set(true);
		}

		const res = await fetch(
			`${secure}://${window.location.hostname}${port}/dailygame`
		);

		const g = await res.json();

		if (g.number != $dailyGameNumber) {
			dailyGame.set({
				puzzle: ['', '', '', '', '', '', '', '', '', '', '', ''],
				solution: [],
				clues: [],
				unknownColors: [],
			});

			dailyGameState.set('notStarted');
			dailyTime.set(0);

			dailyUserSolution.set([]);
			dailyColorsInTray.set([]);
		}

		if (currentMode == 'practice') {
			if (currentPracticeGameState == 'paused') {
				pauseGame();
			} else if (currentPracticeGameState == 'solved') {
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentPracticeGameState == 'unsolved') {
				isIncorrectSolutionOverlayOpen.set(true);
			} else if (currentPracticeGameState == 'loading') {
				getNewGame();
			}
		} else if (currentMode == 'daily' && g.number == $dailyGameNumber) {
			if (currentDailyGameState == 'paused') {
				pauseGame();
			} else if (currentDailyGameState == 'solved') {
				isCorrectSolutionOverlayOpen.set(true);
			} else if (currentDailyGameState == 'unsolved') {
				isIncorrectSolutionOverlayOpen.set(true);
			} else if (currentDailyGameState == 'loading') {
				getDailyGameFromServer();
			}
		}
	});
</script>

<div id="logo">
	<img src={logo} alt="Logicolor" />
	<h2>LogiColor</h2>
</div>
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
	#logo {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2e2f2f;
		gap: 10px;
		padding-top: 5px;
	}

	#logo h2 {
		color: white;
		margin: 0px;
	}

	#logo img {
		width: 28px;
	}

	@media (max-width: 600px) {
		#logo h2 {
			color: white;
			margin: 0px;
			font-size: 16px;
		}

		#logo img {
			width: 20px;
		}
	}

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
