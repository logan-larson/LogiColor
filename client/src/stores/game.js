import { writable } from 'svelte/store';

export const practiceGame = writable({ puzzle: [
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
export const dailyGame = writable({ puzzle: [
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

export const dailyUserSolution = writable([
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

export const practiceUserSolution = writable([
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

export const dailyGameState = writable('notStarted');
export const practiceGameState = writable('notStarted');
export const mode = writable('daily');

export const timeString = writable('00:00');

export const getNewPracticeGame = writable(false);