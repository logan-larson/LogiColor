<script>
  import { isCorrectSolutionOverlayOpen } from '../stores/overlay.js';
  import { game } from '../stores/game.js';

  import { timeString } from '../stores/game.js';

  /**
	 * @type {string}
	 */
  let time;

  timeString.subscribe((t) => {
    time = t;
  });

  function share() {
    isCorrectSolutionOverlayOpen.set(false);
    /*
    game.set({ puzzle: [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
], solution: [], clues: [], unknownColors: [] });
  */
  }

  function close() {
    isCorrectSolutionOverlayOpen.set(false);
  }
</script>

<div class="overlay">
  <div class="container">
    <h1>Congratulations!</h1>
    <h2>Solve time: {time}</h2>
    <div>
      <button on:click={close}>Close</button>
      <button on:click={share}>Share</button>
    </div>
  </div>
</div>

<style>
.overlay {
  position: fixed;
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
  background-color: #252524;
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