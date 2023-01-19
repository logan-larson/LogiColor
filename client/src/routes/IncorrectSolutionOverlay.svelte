<script>
  import { isIncorrectSolutionOverlayOpen } from '../stores/overlay.js';
</script>

<div class="overlay">
  <div class="container">
    <h1>Oops, something's wrong...</h1>
    <button on:click={() => isIncorrectSolutionOverlayOpen.set(false)}>I'll fix it</button>
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