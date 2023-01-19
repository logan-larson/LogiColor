import { writable } from 'svelte/store';

export const game = writable({ puzzle: [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
], solution: [], clues: [], unknownColors: [] });
export const userSolution = writable([
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]);


export const knownColors = writable([]);

export const dailyGameState = writable('not-started');
export const practiceGameState = writable('not-started');
export const mode = writable('daily');

export const timeString = writable('00:00');