import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const timeString = writable('00:00');

// -------------------------- Define locally stored variables --------------------------

// Practice
let localStoragePracticeGame = null;
let localStoragePracticeUserSolution = null;
let localStoragePracticeGameState = null;
let localStoragePracticeColorsInTray = null;
let localStoragePracticeTime = null;

// Daily
let localStorageDailyGame = null;
let localStorageDailyUserSolution = null;
let localStorageDailyGameState = null;
let localStorageDailyColorsInTray = null;
let localStorageDailyTime = null;
let localStorageDailyGameNumber = null;

// General
let localStorageMode = null;


// -------------------------- Retrieve the local storage values --------------------------
// Temporarily disabled, because it's causing an error
if (browser) {

  // Practice

  // @ts-ignore
  localStoragePracticeGame = localStorage.getItem('practiceGame') ? JSON.parse(localStorage.getItem('practiceGame')) : null;
  // @ts-ignore
  localStoragePracticeUserSolution = localStorage.getItem('practiceUserSolution') ? JSON.parse(localStorage.getItem('practiceUserSolution')) : null;
  // @ts-ignore
  localStoragePracticeGameState = localStorage.getItem('practiceGameState') ? localStorage.getItem('practiceGameState') : null;
  // @ts-ignore
  localStoragePracticeColorsInTray = localStorage.getItem('practiceColorsInTray') ? JSON.parse(localStorage.getItem('practiceColorsInTray')) : null;
  // @ts-ignore
  localStoragePracticeTime = localStorage.getItem('practiceTime') ? JSON.parse(localStorage.getItem('practiceTime')) : null;

  // Daily

  // @ts-ignore
  localStorageDailyGame = localStorage.getItem('dailyGame') ? JSON.parse(localStorage.getItem('dailyGame')) : null;
  // @ts-ignore
  localStorageDailyUserSolution = localStorage.getItem('dailyUserSolution') ? JSON.parse(localStorage.getItem('dailyUserSolution')) : null;
  // @ts-ignore
  localStorageDailyGameState = localStorage.getItem('dailyGameState') ? localStorage.getItem('dailyGameState') : null;
  // @ts-ignore
  localStorageDailyColorsInTray = localStorage.getItem('dailyColorsInTray') ? JSON.parse(localStorage.getItem('dailyColorsInTray')) : null;
  // @ts-ignore
  localStorageDailyTime = localStorage.getItem('dailyTime') ? JSON.parse(localStorage.getItem('dailyTime')) : null;
  // @ts-ignore
  localStorageDailyGameNumber = localStorage.getItem('dailyGameNumber') ? JSON.parse(localStorage.getItem('dailyGameNumber')) : null;

  // General

  // @ts-ignore
  localStorageMode = localStorage.getItem('mode') ? localStorage.getItem('mode') : null;
}

// -------------------------- Define the stores --------------------------

// -------------------- Practice --------------------

export const practiceGame = writable(localStoragePracticeGame || { puzzle: [
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

export const practiceUserSolution = writable(localStoragePracticeUserSolution || [
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

export const practiceGameState = writable(localStoragePracticeGameState || 'notStarted');


/**
 * @type {import('svelte/store').Writable<{ id: number; color: string; }[]>}
 */
export const practiceColorsInTray = writable(localStoragePracticeColorsInTray || []);

export const practiceTime = writable(localStoragePracticeTime || 0);


// -------------------- Daily --------------------

export const dailyGame = writable(localStorageDailyGame || { puzzle: [
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

export const dailyUserSolution = writable(localStorageDailyUserSolution || []);

export const dailyGameState = writable(localStorageDailyGameState || 'notStarted');


/**
 * @type {import('svelte/store').Writable<{ id: number; color: string; }[]>}
 */
export const dailyColorsInTray = writable(localStorageDailyColorsInTray || []);

export const dailyTime = writable(localStorageDailyTime || 0);

export const dailyGameNumber = writable(localStorageDailyGameNumber || 0);


// -------------------- General --------------------

export const mode = writable(localStorageMode || 'daily');



// -------------------- Subscribe to the stores, and update the local storage --------------------
if (browser) {

  // Practice

  practiceGame.subscribe((value) => localStorage.setItem('practiceGame', JSON.stringify(value)));
  practiceUserSolution.subscribe((value) => localStorage.setItem('practiceUserSolution', JSON.stringify(value)));
  practiceGameState.subscribe((value) => localStorage.setItem('practiceGameState', value ));
  practiceColorsInTray.subscribe((value) => localStorage.setItem('practiceColorsInTray', JSON.stringify(value)));
  practiceTime.subscribe((value) => localStorage.setItem('practiceTime', JSON.stringify(value)));

  // Daily

  dailyGame.subscribe((value) => localStorage.setItem('dailyGame', JSON.stringify(value)));
  dailyUserSolution.subscribe((value) => localStorage.setItem('dailyUserSolution', JSON.stringify(value)));
  dailyGameState.subscribe((value) => localStorage.setItem('dailyGameState', value));
  dailyColorsInTray.subscribe((value) => localStorage.setItem('dailyColorsInTray', JSON.stringify(value)));
  dailyTime.subscribe((value) => localStorage.setItem('dailyTime', JSON.stringify(value)));
  dailyGameNumber.subscribe((value) => localStorage.setItem('dailyGameNumber', JSON.stringify(value)));

  // General

  mode.subscribe((value) => localStorage.setItem('mode', value));
}

export const getNewPracticeGame = writable(false);
export const getDailyGame = writable(false);