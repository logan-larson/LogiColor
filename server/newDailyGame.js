import { getNewGame } from "./generator/gameGenerator.js";
import { readFileSync, writeFile } from "fs";

let dailyGames = [];

try {
  let data = readFileSync("./daily-games.json", "utf8");
  dailyGames = JSON.parse(data);
} catch (err) {
  console.error(err);
}

const newGame = await getNewGame();

dailyGames.push(newGame);

writeFile("./daily-games.json", JSON.stringify(dailyGames), (err) => {
  if (err) {
    console.log(err);
  }
});