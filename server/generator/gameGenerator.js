import { promisify } from 'util';
import { exec } from 'child_process';
import { colors } from './color.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const asyncExec = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function getNewGame(hardMode = false, seed = -1) {
  // Server path (localhost)
  var lines;

  if (hardMode) {
    const { stdout, stderr } = await asyncExec(
      `java -cp "${__dirname}/bin" Generator hard ${seed}`
    );

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return false;
    }

    lines = stdout.split('\n');
  } else {
    const { stdout, stderr } = await asyncExec(
      `java -cp "${__dirname}/bin" Generator easy ${seed}`
    );

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return false;
    }

    lines = stdout.split('\n');
  }

  var r = '\r';

  var unknownColors = lines[0]
    .split(',')
    .filter((color) => color !== r)
    .filter((color) => color !== '');

  var puzzle = lines[1].split(',').filter((color) => color !== '');

  var clues = [];

  for (let i = 0; i < 6; i++) {
    clues.push(lines[i + 2].substring(3, lines[i + 2].length));
  }

  var solution = lines[8].split(',').filter((color) => color !== '');

  // var newSeed = lines[9].slice(0, lines[9].length - 1); // Windows
  var newSeed = lines[9]; // Linux/Server
  var numNewSeed = Number(newSeed);

  let game = convertToLongStrings(puzzle, solution, clues, unknownColors, hardMode, numNewSeed);

  return game;
}

function convertToLongStrings(puzzle, solution, clues, unknownColors, isHardMode, seed) {
  let newPuzzle = [];

  for (let c of puzzle) {
    newPuzzle.push(getColorName(c));
  }

  let newSolution = [];

  for (let c of solution) {
    newSolution.push(getColorName(c));
  }

  let newUnknownColors = [];

  for (let c of unknownColors) {
    newUnknownColors.push(getColorName(c));
  }

  return {
    puzzle: newPuzzle,
    solution: newSolution,
    clues: clues,
    unknownColors: newUnknownColors,
    isHardMode: isHardMode,
    seed: seed,
  };
}

function getColorName(color) {
  let c = colors.find((c) => c.shortName === color);
  if (c) {
    return c.name.toUpperCase();
  } else {
    return '';
  }
}
