import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const isNewGameOverlayOpen = writable(false);
export const isPauseOverlayOpen = writable(false);
export const isIncorrectSolutionOverlayOpen = writable(false);
export const isCorrectSolutionOverlayOpen = writable(false);
export const isHelpOverlayOpen = writable(false);
export const isUpdateOverlayOpen = writable(false);

let localStorageFirstTime = true;
let localStorageVersion = '0.0.0';

if (browser) {
  localStorageFirstTime = localStorage.getItem('firstTime')
    ? // @ts-ignore
      JSON.parse(localStorage.getItem('firstTime'))
    : true;
  localStorageVersion = localStorage.getItem('version') ?? '0.0.0';
}

/**
 * @type {import('svelte/store').Writable<boolean>}
 */
export const firstTime = writable(localStorageFirstTime);
export const version = writable(localStorageVersion);

if (browser) {
  firstTime.subscribe((value) => {
    localStorage.setItem('firstTime', JSON.stringify(value));
  });
  version.subscribe((value) => {
    localStorage.setItem('version', value);
  });
}
