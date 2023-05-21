<script>
  import Header from './Header.svelte';
  import Clues from './Clues.svelte';
  import Board from './Board.svelte';
  import UnknownColors from './UnknownColors.svelte';
  import NewGameOverlay from './NewGameOverlay.svelte';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';
  import PauseOverlay from './PauseOverlay.svelte';
  import { isPauseOverlayOpen } from '../stores/overlay.js';
  import CorrectSolutionOverlay from './CorrectSolutionOverlay.svelte';
  import { isCorrectSolutionOverlayOpen } from '../stores/overlay.js';
  import IncorrectSolutionOverlay from './IncorrectSolutionOverlay.svelte';
  import { isIncorrectSolutionOverlayOpen } from '../stores/overlay.js';
  import HelpOverlay from './HelpOverlay.svelte';
  import { isHelpOverlayOpen } from '../stores/overlay.js';
  import UpdateOverlay from './UpdateOverlay.svelte';
  import { isUpdateOverlayOpen } from '../stores/overlay.js';

  // Used for generating games based on a seed
	import { mode, getNewPracticeGame, getNewHardPracticeGame, seed } from '../stores/game.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // If there is a seed in the URL, use it
    if (urlParams.has('seed') && urlParams.has('hard')) {
      let s = urlParams.get('seed');
      let h = urlParams.get('hard');
      if (s && h) {
        mode.set('practice');
        if (h === 'true') {
          seed.set(parseInt(s));
          getNewHardPracticeGame.set(true);
          console.log("seed for hard game");
        } else {
          seed.set(parseInt(s));
          getNewPracticeGame.set(true);
          console.log("seed for easy game");
        }
      } else {
        seed.set(-1);
        console.log("no seed");
      }
    }
  });

</script>

{#if $isNewGameOverlayOpen}
  <NewGameOverlay />
{:else if $isUpdateOverlayOpen}
  <UpdateOverlay />
{/if}
{#if $isPauseOverlayOpen}
  <PauseOverlay />
{/if}
{#if $isCorrectSolutionOverlayOpen}
  <CorrectSolutionOverlay />
{/if}
{#if $isIncorrectSolutionOverlayOpen}
  <IncorrectSolutionOverlay />
{/if}
{#if $isHelpOverlayOpen}
  <HelpOverlay />
{/if}

<Header />

<Clues />

<Board />

<UnknownColors />
