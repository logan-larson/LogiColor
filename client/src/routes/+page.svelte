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
