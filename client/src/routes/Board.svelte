<script>
  import Place from './Place.svelte';
  import { game } from '../stores/game.js';
  import { userSolution } from '../stores/game.js';

  /**
   * @type {{ puzzle: string[]; } | undefined}
   */
  let currentGame;

  let colors = ['', '', '', '', '', '', '', '', '', '', '', ''];

  game.subscribe((game) => {
    currentGame = game;
    if (currentGame != undefined) {
      userSolution.set(currentGame.puzzle);
    }
  });
</script>

<div id="container">
  <div id="board">
    {#if currentGame != undefined}
      {#each currentGame.puzzle as color, i}
        <Place {color} row={Math.floor(i / 4)} col={i % 4} />
      {/each}
    {:else}
      {#each colors as color, i}
        <Place {color} row={Math.floor(i / 4)} col={i % 4} />
      {/each}
    {/if}
  </div>
</div>

<style>
  #container {
    width: full;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  #board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 20px;
    padding: 5px;
    background-color: #2e2f2f;
    border-radius: 8px;
  }
</style>
