import { colors } from './color.js';

getGame();

function getGame() {
  let numToRemove = 6;

  let solution = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ];

  let puzzle = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ];

  let colorsList = colors;

  colorsList = shuffle(colorsList);

  let colorsToRemove = [];

  for (let i = 0; i < numToRemove; i++) {
    colorsToRemove.push(colorsList[i]);
  }

  colorsList = shuffle(colorsList);

  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution[i].length; j++) {
      let colorIndex = Math.floor(Math.random() * colorsList.length);

      solution[i][j] = colorsList[colorIndex];
      puzzle[i][j] = colorsToRemove.includes(colorsList[colorIndex])
        ? {}
        : colorsList[colorIndex];

      // I think this removes the color from the list
      colorsList = colorsList.filter((_, i) => i != colorIndex);
    }
  }

  console.log(colorsList);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
