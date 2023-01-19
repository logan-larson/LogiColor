import { writable } from 'svelte/store';

export const isNewGameOverlayOpen = writable(false);
export const isPauseOverlayOpen = writable(false);