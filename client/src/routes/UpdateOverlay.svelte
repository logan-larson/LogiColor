<script>
	import {
		isUpdateOverlayOpen,
		version,
		firstTime,
	} from '../stores/overlay.js';
	import { onMount } from 'svelte';

	let title = '';
	let date = '';
	let notes = '';

	function close() {
		isUpdateOverlayOpen.set(false);
	}

	onMount(async () => {
		if ($firstTime) {
			close();
			return;
		}

		console.log($version);

		const res = await fetch(`/versions/${$version}`);
		const data = await res.json();

		console.log(data);

		title = data.title;
		date = data.date;
		notes = data.notes;
	});
</script>

<div class="overlay">
	<div class="container">
		<h1>{title}</h1>
		<h2>{date}</h2>
		<ul>
			{#each notes as note}
				<li>{note}</li>
			{/each}
		</ul>
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
		z-index: 30;
	}

	.container {
		width: 70vw;
		height: 80vh;
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
	}

	li {
		margin: 10px 0px;
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
