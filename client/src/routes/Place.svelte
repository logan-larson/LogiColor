<script>
  import Color from './Color.svelte';

  import { dndzone } from 'svelte-dnd-action';

  import { userSolution } from '../stores/game.js';

  /**
   * @type {string}
   */
  export let color;

  /**
   * @type {number}
   */
  export let row;

  /**
   * @type {number}
   */
  export let col;

  /**
   * @type { { id: number; color: string }[] }
   */
  let items = [];

  $: options = {
    items,
    dropFromOthersDisabled: items.length != 0,
    dragDisabled: false,
    flipDurationMs: 100,
  };

  if (color != '') {
    items.push({ id: 0, color: color });
    //options.dragDisabled = items.length != 0;
  }

  /**
   * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
   */
  function handleDndConsider(e) {
    items = e.detail.items;
  }

  /**
   * @param {{ detail: { items: { id: number; color: string; }[]; }; }} e
   */
  function handleDndFinalize(e) {
    items = e.detail.items;

    // Update the users solution to the puzzle
    console.log(`Places items: ${JSON.stringify(items)}`);
    if (items[0] != undefined && items[0].color != undefined) {
      userSolution.update((s) => {
        s[row * 4 + col] = items[0].color;
        return s;
      });
    }
  }

  let bgColor = getHexBgColor(color);
  let textColor = getContrastYIQ(bgColor);

  /**
   * @param {string} color
   */
  function getHexBgColor(color) {
    switch (color) {
      case 'BLACK':
        return '#474544';
      case 'TEAL':
        return '#336B68';
      case 'ORANGE':
        return '#EC6932';
      case 'MINT':
        return '#62BFA7';
      case 'EMERALD':
        return '#688C51';
      case 'MAGENTA':
        return '#E8108C';
      case 'MUSTARD':
        return '#DBAF4A';
      case 'PURPLE':
        return '#503190';
      case 'BROWN':
        return '#896541';
      case 'WHITE':
        return '#FCFEFF';
      case 'CORAL':
        return '#F1A281';
      case 'COBALT':
        return '#386091';
      default:
        return '#898989';
    }
  }

  /**
   * @param {string} hexcolor
   */
  function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  }
</script>

<div
  style="color: white; background-color: #898989"
  use:dndzone={options}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as color (color.id)}
    <Color color={color.color} />
  {/each}
</div>

<style>
  div {
    width: 20vmin;
    max-width: 100px;
    height: 20vmin;
    max-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    place-self: center;
    user-select: none;
  }

  @media (max-width: 600px) {
    div {
      font-size: 12px;
    }
  }
</style>
