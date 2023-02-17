import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';
import { getNewGame } from './generator/gameGenerator.js';
import { readFile } from 'fs';

const app = express();

app.use(bodyParser.json());

const port = 5000;

app.get('/newgame', async (req, res) => {
  // This is where I will generate a new game
  let game = await getNewGame();

  res.json(game);
});

app.get('/dailygame', (req, res) => {
  readFile('./daily-games.json', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      // @ts-ignore
      const dailyGames = JSON.parse(data);

      res.json({
        game: dailyGames[dailyGames.length - 1],
        number: dailyGames.length,
      });
    }
  });
});

app.get('/logo', (req, res) => {
  res.sendFile('/assets/Logo.png', { root: '.' });
});

app.use(handler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
