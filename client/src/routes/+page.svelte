<script>
  import Header from './Header.svelte';
  import Clues from './Clues.svelte';
  import Board from './Board.svelte';
  import UnknownColors from './UnknownColors.svelte';
  import NewGameOverlay from './NewGameOverlay.svelte';
  import { isNewGameOverlayOpen } from '../stores/overlay.js';
  import PauseOverlay from './PauseOverlay.svelte';
  import { isPauseOverlayOpen } from '../stores/overlay.js';
</script>

{#if $isNewGameOverlayOpen}
  <NewGameOverlay>
    <p>this should be open</p>
  </NewGameOverlay>
{/if}
{#if $isPauseOverlayOpen}
  <PauseOverlay />
{/if}

<Header />

<Clues />

<Board />

<UnknownColors />
