<script>
  import { game } from '../stores/game.js';

  /**
   * @type { {clues: [], puzzle: [], solution: [], unknownColors: []} }
   */
  let currentGame;

  game.subscribe((g) => {
    currentGame = g;
  });
</script>

<div>
  <ol>
    {#if currentGame != undefined}
      {#each currentGame.clues as clue}
        <li>{clue}</li>
      {/each}
    {/if}
    <!-- <li>MAGENTA is next to BROWN</li> -->
    <!-- <li>COBALT is next to WHITE</li> -->
    <!-- <li>MINT is next to BLACK</li> -->
  </ol>
</div>

<style>
  div {
    color: #fff;
    width: 80vmin;
    min-width: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  ol {
    list-style-type: upper-roman;
  }

  li {
    margin: 3px 0px;
  }
</style>
