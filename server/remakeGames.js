import { getNewGame } from './generator/gameGenerator.js';
import { readFileSync, writeFile } from 'fs';

/* Hopefully you never have to use this again */
/* Wiping the history of the first 28 days was not cool man */

async function remakeGames() {
  let dailyGames = [];

  for (let i = 1; i < 29; i++) {
    const newGame = await getNewGame();

    newGame.day = i;

    dailyGames.push(newGame);
  }

  // Local path (localhost)
  // writeFile('./daily-games.json', JSON.stringify(dailyGames), (err) => {
  writeFile(
    '/root/LogiColor/server/daily-games.json',
    JSON.stringify(dailyGames),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

remakeGames();
