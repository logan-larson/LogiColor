import { colors } from './color.js';
import { generateClues } from './clueGenerator.js';
import { getClues } from './solutionGenerator.js';
import { ConstraintType } from './constraintType.js';

export function getGame() {
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
	let allClues = generateClues(solution);

	// Select the 6 necessary clues that provide 1 solution to the puzzle
	let selectedClues = getClues(allClues, puzzle, solution, colorsToRemove);

	let formattedClues = formatClues(selectedClues);

	let formattedPuzzle = formatPuzzle(puzzle);

	let formattedSolution = formatPuzzle(solution);

	let formattedColors = [];

	colorsToRemove.forEach((p) => formattedColors.push(formatName(p)));

	// Return the game: { puzzle, solution, clues }
	let game = {
		puzzle: formattedPuzzle,
		solution: formattedSolution,
		clues: formattedClues,
		unknownColors: formattedColors,
	};

	console.log(game);

	return game;
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

function formatClues(clues) {
	let formattedClues = [];

	for (let clue of clues) {
		switch (clue.name) {
			case 'NEXT_TO':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.NEXT_TO.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'SAME_ROW':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.SAME_ROW.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'SAME_COL':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.SAME_COL.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'ORTHO_ADJ':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.ORTHO_ADJ.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'DIAG_ADJ':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.DIAG_ADJ.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'TO_LEFT':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.TO_LEFT.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'TO_RIGHT':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.TO_RIGHT.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'ABOVE':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.ABOVE.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'BELOW':
				formattedClues.push(
					formatName(clue.first) +
						ConstraintType.BELOW.ruleStr +
						formatName(clue.second)
				);
				break;
			case 'CORNER':
				formattedClues.push(
					formatName(clue.first) + ConstraintType.CORNER.ruleStr
				);
				break;
		}
	}

	return formattedClues;
}

function formatPuzzle(puzzle) {
	let formattedPuzzle = [];

	for (let p of puzzle) {
		formattedPuzzle.push(...p);
	}

	let puz = [];

	formattedPuzzle.forEach((p) => puz.push(formatName(p)));

	return puz;
}

function formatName(color) {
	switch (color) {
		case 'WHI':
			return 'WHITE';
		case 'COB':
			return 'COBALT';
		case 'ORA':
			return 'ORANGE';
		case 'BRO':
			return 'BROWN';
		case 'MUS':
			return 'MUSTARD';
		case 'EME':
			return 'EMERALD';
		case 'PUR':
			return 'PURPLE';
		case 'COR':
			return 'CORAL';
		case 'MAG':
			return 'MAGENTA';
		case 'TEA':
			return 'TEAL';
		case 'BLA':
			return 'BLACK';
		case 'MIN':
			return 'MINT';
		default:
			return '';
	}
}
