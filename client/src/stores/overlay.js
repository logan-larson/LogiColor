import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const isNewGameOverlayOpen = writable(false);
export const isPauseOverlayOpen = writable(false);
export const isIncorrectSolutionOverlayOpen = writable(false);
export const isCorrectSolutionOverlayOpen = writable(false);
export const isHelpOverlayOpen = writable(false);

let localStorageFirstTime = true;

if (browser) {
  // @ts-ignore
  localStorageFirstTime = localStorage.getItem('firstTime') ? JSON.parse(localStorage.getItem('firstTime')) : true; 
}

/**
 * @type {import('svelte/store').Writable<boolean>}
 */
export const firstTime = writable(localStorageFirstTime);

if (browser) {
  firstTime.subscribe(value => {
    localStorage.setItem('firstTime', JSON.stringify(value));
  });
}

