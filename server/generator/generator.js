import { colors } from './color.js';
import { generateClues } from './clueGenerator.js';

getGame();

function getGame() {
	let numToRemove = 6;

	// Generate the random solution
	// Get the list of colors
	let colorsList = colors;

	// Randomly shuffle the list
	colorsList = shuffle(colorsList);

	let solution = [
		['', '', '', ''],
		['', '', '', ''],
		['', '', '', ''],
	];

	// Populate the solution array based on the list
	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < solution[i].length; j++) {
			solution[i][j] = colorsList[i * 4 + j].shortName;
		}
	}

	// Randomly set the colors to be removed
	colorsList = shuffle(colorsList);

	let colorsToRemove = [];

	for (let i = 0; i < numToRemove; i++) {
		colorsToRemove.push(colorsList[i].shortName);
	}

	// Populate the puzzle but don't add the unkown colors
	let puzzle = [
		['', '', '', ''],
		['', '', '', ''],
		['', '', '', ''],
	];

	for (let i = 0; i < puzzle.length; i++) {
		for (let j = 0; j < puzzle[i].length; j++) {
			// Check if the color at this location is in the colors to remove
			if (!colorsToRemove.includes(solution[i][j])) {
				puzzle[i][j] = solution[i][j];
			}
		}
	}

	// Generate all the possible clues
	let clues = [];

	clues = generateClues(solution);

	// Select the 6 necessary clues that provide 1 solution to the puzzle

	// Return the game: { puzzle, solution, clues }
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
