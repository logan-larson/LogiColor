import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';
import { getGame } from './generator/generator.js';

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/newgame', (req, res) => {
	// This is where I will generate a new game
	let game = getGame();

	// Temporarily sending a dummy game
	res.json(game);

	/*{
    clues: [
      'ORANGE is next to COBALT',
      'TEAL is diagonally adjacent to PURPLE',
      'PURPLE is next to BROWN',
      'CORAL is diagonally adjacent to MINT',
      'WHITE is diagonally adjacent to TEAL',
      'MUSTARD is somewhere below WHITE',
    ],
    puzzle: [
      '',
      '',
      '',
      'WHITE',
      'COBALT',
      '',
      '',
      '',
      'MINT',
      'EMERALD',
      'MAGENTA',
      'BLACK',
    ],
    solution: [
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
    ],
    unknownColors: ['ORANGE', 'PURPLE', 'BROWN', 'CORAL', 'TEAL', 'MUSTARD'],
  }
  );
  */
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
