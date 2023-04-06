<script>
  import { isCorrectSolutionOverlayOpen } from '../stores/overlay.js';
  import { timeString, mode, dailyGameNumber } from '../stores/game.js';

  let currentMode = 'daily';

  mode.subscribe((m) => {
    currentMode = m;
  });

  let currentDailyGameNumber = 0;

  dailyGameNumber.subscribe((n) => {
    currentDailyGameNumber = n;
  });

  /**
   * @type {string}
   */
  let time;

  timeString.subscribe((t) => {
    time = t;
  });

  function share() {
    if (currentMode == 'daily') {
      if (navigator.share) {
        navigator
          .share({
            title: `Daily Logicolor`,
            text: `Daily Puzzle #${currentDailyGameNumber}\nI solved the puzzle in ${time}!`,
            url: 'https://logicolor.fun',
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        navigator.clipboard.writeText(
          `Daily Puzzle #${currentDailyGameNumber}\nlogicolor.fun\nI solved the puzzle in ${time}!`
        );
        alert('Copied results to your clipboard!');
      }
    } else {
      if (navigator.share) {
        navigator
          .share({
            title: 'Practice Logicolor',
            text: `Practice Puzzle\nI solved the puzzle in ${time}!`,
            url: 'https://logicolor.fun',
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        navigator.clipboard.writeText(
          `Practice Puzzle\nI solved the puzzle in ${time}!\nhttps://logicolor.fun`
        );
        alert('Copied results to your clipboard!');
      }
    }

    //isCorrectSolutionOverlayOpen.set(false);
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
    /*height: 20vh;*/
    color: white;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #252524;
    filter: drop-shadow(0px 10px 10px #000000);
  }

  @media (max-width: 800px) {
    .container {
      width: 90vw;
      height: 30vh;
      padding: 0px;
    }
  }

  button {
    padding: 8px 10px;
    background-color: #898989;
    color: #d6d6d6;
    border-width: 0px;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #6b6b6b;
    color: #fff;
  }
</style>
