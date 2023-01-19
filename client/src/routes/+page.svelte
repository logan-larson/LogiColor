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
</script>

{#if $isNewGameOverlayOpen}
  <NewGameOverlay />
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

<Header />

<Clues />

<Board />

<UnknownColors />
