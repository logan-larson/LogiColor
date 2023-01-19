<script>
  import { game } from '../stores/game.js';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';

  /**
	 * @type { string[] }
	 */
  let currentGame = [];

  game.subscribe((g) => {
    if (g != undefined) {
      currentGame = g.puzzle;
    } else {
      currentGame = [];
    }
  });

</script>

<div class="overlay">
  <div class="container">
    {#if currentGame.length === 0}
      <h1>Please wait while we cook up your puzzle...</h1>
    {:else}
      <h1>Ready to play?</h1>
      <button on:click={() => isNewGameOverlayOpen.set(false)}>I'm ready</button>
    {/if}
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
  width: 20vw;
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

button {
  padding: 8px 10px;
  background-color: #898989;
  border-width: 0px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #6b6b6b;
}
</style>