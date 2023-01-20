import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';
import { getGame } from './generator/generator.js';
import { getNewGame } from './generator/gameGenerator.js';

const app = express();

app.use(bodyParser.json());

const port = 80;

app.get('/newgame', async (req, res) => {
	// This is where I will generate a new game
	let game = await getNewGame();

	res.json(game);
});

app.get('/dailygame', (req, res) => {

});

app.post('/checksolution', (req, res) => {
	console.log(req.body);
	const body = req.body;

	const solution = [
		'ORANGE',
		'PURPLE',
		'BROWN',
		'WHITE',
		'COBALT',
		'CORAL',
		'TEAL',
		'MUSTARD',
		'MINT',
		'EMERALD',
		'MAGENTA',
		'BLACK',
	];

	console.log(body);

	const isEqual = solution.every((value, index) => value === body[index]);

	res.json({ isCorrect: isEqual });
});

app.use(handler);

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
