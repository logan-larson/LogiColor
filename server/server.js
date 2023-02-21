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

app.get('/newhardgame', async (req, res) => {
  let game = await getNewGame(true);

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

// User calls to get the current version number
app.get('/versions', (req, res) => {
  readFile('./updates.json', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      // @ts-ignore
      const updates = JSON.parse(data);

      const update = updates[updates.length - 1];

      res.json({
        version: update.version,
      });
    }
  });
});

// User calls to get the update notes for a specific version
app.get('/versions/:version', (req, res) => {
  readFile('./updates.json', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      // @ts-ignore
      const updates = JSON.parse(data);

      const update = updates.find(
        (update) => update.version === req.params.version
      );

      res.json(update);
    }
  });
});

app.use(handler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
