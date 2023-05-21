<script>
  import Header from './Header.svelte';
  import Clues from './Clues.svelte';
  import Board from './Board.svelte';
  import UnknownColors from './UnknownColors.svelte';

  /* Overlays - TODO: Make a template that utilizes an overlay interface */
  import NewGameOverlay from './NewGameOverlay.svelte';
  import PauseOverlay from './PauseOverlay.svelte';
  import CorrectSolutionOverlay from './CorrectSolutionOverlay.svelte';
  import IncorrectSolutionOverlay from './IncorrectSolutionOverlay.svelte';
  import HelpOverlay from './HelpOverlay.svelte';
  import UpdateOverlay from './UpdateOverlay.svelte';
  import {
    isUpdateOverlayOpen,
    isPauseOverlayOpen,
    isCorrectSolutionOverlayOpen,
    isIncorrectSolutionOverlayOpen,
    isHelpOverlayOpen,
    isNewGameOverlayOpen
  } from '../stores/overlay.js';

  // Used for generating games based on a seed
	import { mode, getNewPracticeGame, getNewHardPracticeGame, seed, isHard } from '../stores/game.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // If there is a seed in the URL, use it
    if (urlParams.has('seed') && urlParams.has('hard')) {
      let s = urlParams.get('seed');
      let h = urlParams.get('hard');
      if (s && h) {
        closeAllOverlays();
        mode.set('practice');
        if (h === 'true') {
          seed.set(parseInt(s));
          isHard.set(true);
          getNewHardPracticeGame.set(true);
          console.log("seed for hard game");
        } else {
          seed.set(parseInt(s));
          isHard.set(false);
          getNewPracticeGame.set(true);
          console.log("seed for easy game");
        }
      } else {
        seed.set(-1);
        console.log("no seed");
      }
    }
  });

  function closeAllOverlays() {
    isCorrectSolutionOverlayOpen.set(false);
    isIncorrectSolutionOverlayOpen.set(false);
    isHelpOverlayOpen.set(false);
    isPauseOverlayOpen.set(false);
    isUpdateOverlayOpen.set(false);
    isNewGameOverlayOpen.set(false);
  }

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
