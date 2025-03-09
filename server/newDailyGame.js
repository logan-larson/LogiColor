import { getNewGame } from './generator/gameGenerator.js';
import { readFileSync, writeFile } from 'fs';

async function newGame() {
  let dailyGames = [];

  try {
    // Local path (localhost)
    let data = readFileSync('./daily-games.json', 'utf8');
    // let data = readFileSync(
    //   '/root/LogiColor/server/daily-games.json',
    //   'utf8'
    // );
    dailyGames = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  const isWildWednesday = new Date().getDay() === 3;

  const newGame = await getNewGame(isWildWednesday);

  newGame.day = dailyGames.length + 1;

  dailyGames.push(newGame);

  // Local path (localhost)
  writeFile('./daily-games.json', JSON.stringify(dailyGames), (err) => {
  // writeFile(
  //   '/root/LogiColor/server/daily-games.json',
  //   JSON.stringify(dailyGames),
  //   (err) => {
    if (err) {
      console.log(err);
    }
  });
}

newGame();
