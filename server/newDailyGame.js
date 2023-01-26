import { getNewGame } from "./generator/gameGenerator.js";
import { readFileSync, writeFile } from "fs";

async function newGame() {

  let dailyGames = [];

  try {
    // Local path (localhost)
    // let data = readFileSync("./daily-games.json", "utf8");
    let data = readFileSync("/root/ColorPuzzleApp/server/daily-games.json", "utf8");
    dailyGames = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  const newGame = await getNewGame();

  dailyGames.push(newGame);

  // writeFile("./daily-games.json", JSON.stringify(dailyGames), (err) => {
  writeFile("/root/ColorPuzzleApp/server/daily-games.json", JSON.stringify(dailyGames), (err) => {
    if (err) {
      console.log(err);
    }
  });

}

newGame();