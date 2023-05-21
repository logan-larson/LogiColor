import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';
import { getNewGame } from './generator/gameGenerator.js';
import { readFile } from 'fs';

const app = express();

app.use(bodyParser.json());

const port = 5000;

// Games with seeds
app.get('/newgame/:seed', async (req, res) => {
  let seed = Number(req.params.seed);

  let game = await getNewGame(false, seed);

  res.json(game);
});

app.get('/newhardgame/:seed', async (req, res) => {
  let seed = Number(req.params.seed);

  let game = await getNewGame(true, seed);

  res.json(game);
});

// Games without seeds
app.get('/newgame', async (req, res) => {
  // This is where I will generate a new game
  let game = await getNewGame(false);

  res.json(game);
});

app.get('/newhardgame', async (req, res) => {
  let game = await getNewGame(true);

  res.json(game);
});

// Daily game
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

// User calls to get all the update notes
app.get('/updates', (req, res) => {
  readFile('./updates.json', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      // @ts-ignore
      const updates = JSON.parse(data);

      // Reverse the array so that the most recent update is first
      updates.reverse();

      res.json(updates);
    }
  });
});

// User calls to get the update notes for a specific version
app.get('/updates/:version', (req, res) => {
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
