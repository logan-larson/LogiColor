import { getNewGame } from "./generator/gameGenerator.js";
import { readFileSync, writeFileSync } from "fs";

const dailyGames = [];

readFileSync("./daily-games.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else { 
    dailyGames = JSON.parse(data);
  }
});

const newGame = await getNewGame();

dailyGames.push(newGame);

writeFileSync("./daily-games.json", JSON.stringify(dailyGames), (err) => {
  if (err) {
    console.log(err);
  }
});
