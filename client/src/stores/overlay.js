import { writable } from 'svelte/store';

export const isNewGameOverlayOpen = writable(false);
export const isPauseOverlayOpen = writable(false);
export const isIncorrectSolutionOverlayOpen = writable(false);
export const isCorrectSolutionOverlayOpen = writable(false);