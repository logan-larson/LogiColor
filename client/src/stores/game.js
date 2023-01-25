import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// -------------------------- Define locally stored variables --------------------------

// Practice
let localStoragePracticeGame = null;
let localStoragePracticeUserSolution = null;
let localStoragePracticeGameState = null;
let localStoragePracticeColorsInTray = null;

// Daily
let localStorageDailyGame = null;
let localStorageDailyUserSolution = null;
let localStorageDailyGameState = null;
let localStorageDailyColorsInTray = null;


// -------------------------- Retrieve the local storage values --------------------------
// Temporarily disabled, because it's causing an error
/*
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

  // Daily

  // @ts-ignore
  localStorageDailyGame = localStorage.getItem('dailyGame') ? JSON.parse(localStorage.getItem('dailyGame')) : null;
  // @ts-ignore
  localStorageDailyUserSolution = localStorage.getItem('dailyUserSolution') ? JSON.parse(localStorage.getItem('dailyUserSolution')) : null;
  // @ts-ignore
  localStorageDailyGameState = localStorage.getItem('dailyGameState') ? localStorage.getItem('dailyGameState') : null;
  // @ts-ignore
  localStorageDailyColorsInTray = localStorage.getItem('dailyColorsInTray') ? JSON.parse(localStorage.getItem('dailyColorsInTray')) : null;
}
*/

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
 * @type {import('svelte/store').Writable<string[]>}
 */
export const practiceColorsInTray = writable(localStoragePracticeColorsInTray || []);


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

export const dailyUserSolution = writable(localStorageDailyUserSolution || [
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

export const dailyGameState = writable(localStorageDailyGameState || 'notStarted');


/**
 * @type {import('svelte/store').Writable<string[]>}
 */
export const dailyColorsInTray = writable(localStorageDailyColorsInTray || []);




// -------------------- Subscribe to the stores, and update the local storage --------------------
if (browser) {

  // Practice

  practiceGame.subscribe((value) => localStorage.setItem('practiceGame', JSON.stringify(value)));
  practiceUserSolution.subscribe((value) => localStorage.setItem('practiceUserSolution', JSON.stringify(value)));
  practiceGameState.subscribe((value) => localStorage.setItem('practiceGameState', JSON.stringify(value)));
  practiceColorsInTray.subscribe((value) => localStorage.setItem('practiceColorsInTray', JSON.stringify(value)));

  // Daily

  dailyGame.subscribe((value) => localStorage.setItem('dailyGame', JSON.stringify(value)));
  dailyUserSolution.subscribe((value) => localStorage.setItem('dailyUserSolution', JSON.stringify(value)));
  dailyGameState.subscribe((value) => localStorage.setItem('dailyGameState', JSON.stringify(value)));
  dailyColorsInTray.subscribe((value) => localStorage.setItem('dailyColorsInTray', JSON.stringify(value)));

}




export const mode = writable('daily');

export const timeString = writable('00:00');

export const getNewPracticeGame = writable(false);