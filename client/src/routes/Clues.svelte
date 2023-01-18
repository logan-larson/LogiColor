<script>
  import { game } from '../stores/game.js';

  /**
   * @type { { puzzle: string[], solution: string[], clues: string[], unknownColors: string[]} }
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
  </ol>
</div>

<style>
  div {
    color: #fff;
    display: flex;
  }

  ol {
    list-style-type: upper-roman;
    margin: 20px auto;
  }

  li {
    margin: 3px 0px;
  }
</style>
