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
    isNewGameOverlayOpen,
    isPauseOverlayOpen,
    isCorrectSolutionOverlayOpen,
    isIncorrectSolutionOverlayOpen,
    isHelpOverlayOpen,
    isUpdateOverlayOpen,
  } from '../stores/overlay.js';
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
