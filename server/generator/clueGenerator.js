import { ConstraintType } from './constraintType.js';
import { ConstraintTypeList } from './constraintType.js';

export function generateClues(solution) {
	let clues = [];

	// For each color, generate all the possible constraints
	for (let row = 0; row < solution.length; row++) {
		for (let col = 0; col < solution[0].length; col++) {
			for (const type in ConstraintTypeList) {
				switch (ConstraintTypeList[type].name) {
					case 'NEXT_TO':
						clues = clues.concat(getNextToClues(row, col, solution));
						break;
					case 'SAME_ROW':
						clues = clues.concat(getSameRowClues(row, col, solution));
						break;
					case 'SAME_COL':
						clues = clues.concat(getSameColClues(row, col, solution));
						break;
					case 'ORTHO_ADJ':
						clues = clues.concat(getOrthoAdjClues(row, col, solution));
						break;
					case 'DIAG_ADJ':
						clues = clues.concat(getDiagAdjClues(row, col, solution));
						break;
					case 'TO_LEFT':
						clues = clues.concat(getToLeftClues(row, col, solution));
						break;
					case 'TO_RIGHT':
						clues = clues.concat(getToRightClues(row, col, solution));
						break;
					case 'ABOVE':
						clues = clues.concat(getAboveClues(row, col, solution));
						break;
					case 'BELOW':
						clues = clues.concat(getBelowClues(row, col, solution));
						break;
					case 'CORNER':
						clues = clues.concat(getCornerClues(row, col, solution));
						break;
				}
			}
		}
	}

	return clues;
}

function isValidPoint(oriRow, oriCol, curRow, curCol, solution) {
	if (oriRow === curRow && oriCol === curCol) return false;

	if (curRow < 0 || curRow >= solution.length) return false;

	if (curCol < 0 || curCol >= solution[0].length) return false;

	return true;
}

function getNextToClues(row, col, solution) {
	let clues = [];

	for (let i = row - 1; i < row + 2; i++) {
		for (let j = col - 1; j < col + 2; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			clues.push({
				name: ConstraintType.NEXT_TO.name,
				first: solution[row][col],
				second: solution[i][j],
			});
		}
	}

	return clues;
}

function getSameRowClues(row, col, solution) {
	let clues = [];

	for (let i = 0; i < solution[0].length; i++) {
		if (!isValidPoint(row, col, row, i, solution)) continue;

		clues.push({
			name: ConstraintType.SAME_ROW.name,
			first: solution[row][col],
			second: solution[row][i],
		});
	}

	return clues;
}

function getSameColClues(row, col, solution) {
	let clues = [];

	for (let i = 0; i < solution.length; i++) {
		if (!isValidPoint(row, col, row, i, solution)) continue;

		clues.push({
			name: ConstraintType.SAME_COL.name,
			first: solution[row][col],
			second: solution[i][col],
		});
	}

	return clues;
}

function getOrthoAdjClues(row, col, solution) {
	let clues = [];

	for (let i = row - 1; i < row + 2; i++) {
		for (let j = col - 1; j < col + 2; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			if (i === row || j === col) {
				clues.push({
					name: ConstraintType.ORTHO_ADJ.name,
					first: solution[row][col],
					second: solution[i][j],
				});
			}
		}
	}

	return clues;
}

function getDiagAdjClues(row, col, solution) {
	let clues = [];

	for (let i = row - 1; i < row + 2; i++) {
		for (let j = col - 1; j < col + 2; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			if (i !== row && j !== col) {
				clues.push({
					name: ConstraintType.DIAG_ADJ.name,
					first: solution[row][col],
					second: solution[i][j],
				});
			}
		}
	}

	return clues;
}

function getToLeftClues(row, col, solution) {
	let clues = [];

	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < col; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			clues.push({
				name: ConstraintType.TO_LEFT.name,
				first: solution[i][j],
				second: solution[row][col],
			});
		}
	}

	return clues;
}

function getToRightClues(row, col, solution) {
	let clues = [];

	for (let i = 0; i < solution.length; i++) {
		for (let j = col + 1; j < solution[0].length; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			clues.push({
				name: ConstraintType.TO_RIGHT.name,
				first: solution[i][j],
				second: solution[row][col],
			});
		}
	}

	return clues;
}

function getAboveClues(row, col, solution) {
	let clues = [];

	for (let i = 0; i < row; i++) {
		for (let j = 0; j < solution[0].length; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			clues.push({
				name: ConstraintType.ABOVE.name,
				first: solution[i][j],
				second: solution[row][col],
			});
		}
	}

	return clues;
}

function getBelowClues(row, col, solution) {
	let clues = [];

	for (let i = row + 1; i < solution.length; i++) {
		for (let j = 0; j < solution[0].length; j++) {
			if (!isValidPoint(row, col, i, j, solution)) continue;

			clues.push({
				name: ConstraintType.BELOW.name,
				first: solution[i][j],
				second: solution[row][col],
			});
		}
	}

	return clues;
}

function getCornerClues(row, col, solution) {
	let clues = [];

	if (row === 0 && col === 0)
		clues.push({
			name: ConstraintType.CORNER.name,
			first: solution[row][col],
			second: solution[0][0],
		});
	if (row === 0 && col === solution[0].length - 1)
		clues.push({
			name: ConstraintType.CORNER.name,
			first: solution[row][col],
			second: solution[0][0],
		});
	if (row === solution.length - 1 && col === 0)
		clues.push({
			name: ConstraintType.CORNER.name,
			first: solution[row][col],
			second: solution[0][0],
		});
	if (row === solution.length - 1 && col === solution[0].length - 1)
		clues.push({
			name: ConstraintType.CORNER.name,
			first: solution[row][col],
			second: solution[0][0],
		});

	return clues;
}
