<script>
	import { isHelpOverlayOpen, firstTime } from '../stores/overlay.js';

	function close() {
		isHelpOverlayOpen.set(false);
		firstTime.set(false);
	}
</script>

<div class="overlay">
	<div class="container">
		<h1>
			Hey, I noticed this is your first time here!<br /><br />If you want to
			learn how to play, click the <u>Help</u> button in the top right.<br /><br
			/>Otherwise, if you want to get right into the fun click the
			<u>Play Daily Game</u>
			button.<br /><br />Happy solving!
		</h1>
		<button on:click={close}>Close</button>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		background-color: #252524;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
	}

	.container {
		width: 70vw;
		height: 20vh;
		color: white;
		border-radius: 12px;
		padding: 8px 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 800px) {
		.container {
			width: 90vw;
		}
	}

	h1 {
		text-align: center;
		font-size: 3vmin;
	}

	button {
		border: none;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		background-color: #6b6b6b;
		color: #d6d6d6;
	}

	button:hover {
		background-color: #575757;
		color: #fff;
	}
</style>
