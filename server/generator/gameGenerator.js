import { promisify } from 'util';
import { exec }  from 'child_process';
import { colors } from './color.js';

const asyncExec = promisify(exec);

export async function getNewGame() {


  // const { stdout, stderr } = await asyncExec("java -cp generator/bin Generator");
  // Server path (localhost)
  const { stdout, stderr } = await asyncExec("java -cp /root/ColorPuzzleApp/server/generator/bin Generator");

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return false;
  }

  var nl = '\n';
  var r = '\r';

  var lines = stdout.split(nl);


  var unknownColors = lines[0].split(',').filter((color) => color !== r).filter((color) => color !== '');


  var puzzle = lines[1].split(',').filter((color) => color !== '');

  var clues = [];

  for (let i = 0; i < 6; i++) {
    clues.push(lines[i+2].substring(3, lines[i+2].length));
  }

  var solution = lines[8].split(',').filter((color) => color !== '');


  let game = convertToLongStrings(puzzle, solution, clues, unknownColors);

  return game;
}

function convertToLongStrings(puzzle, solution, clues, unknownColors) {

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

  return { puzzle: newPuzzle, solution: newSolution, clues: clues, unknownColors: newUnknownColors };
}

function getColorName(color) {
  let c = colors.find((c) => c.shortName === color);
  if (c) {
    return c.name.toUpperCase();
  } else { 
    return '';
  }
}
