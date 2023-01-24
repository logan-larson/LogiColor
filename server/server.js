import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';
import { getNewGame } from './generator/gameGenerator.js';
import { readFile} from "fs";

const app = express();

app.use(bodyParser.json());

const port = 80;

app.get('/newgame', async (req, res) => {
	// This is where I will generate a new game
	let game = await getNewGame();

	res.json(game);
});

app.get('/dailygame', (req, res) => {
	console.log("Getting daily game");
	readFile("./daily-games.json", (err, data) => {
		if (err) {
			console.log(err);
			res.json(err);
		} else { 
			const dailyGames = JSON.parse(data);

			res.json(dailyGames[dailyGames.length - 1]);
		}
	});
});

app.use(handler);

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
