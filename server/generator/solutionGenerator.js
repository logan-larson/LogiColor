let clues = [];
let knownAssignments = [];

export function getClues(allClues, puzzle, solution, unknownColors) {
	clues = allClues;

	setupAssignments(puzzle);

	return getNecessaryClues(clues, puzzle, solution, unknownColors);
}

function setupAssignments(puzzle) {
	for (let i = 0; i < puzzle.length; i++) {
		for (let j = 0; j < puzzle[0].length; j++) {
			if (puzzle[i][j] !== '') {
				knownAssignments.push({
					row: i,
					col: j,
					color: puzzle[i][j],
				});
			}
		}
	}
}

function getNecessaryClues(clues, puzzle, solution, unknownColors) {
	let necessaryClues = [];

	let numSolutions = 0;

	while (numSolutions != 1) {
		necessaryClues = [];

		// Set random clues for unknown places
		// This should be optimized in the future to reduce puzzle generation time
		// Move to a proper CSP solver
		for (let i = 0; i < puzzle.length; i++) {
			for (let j = 0; j < puzzle[0].length; j++) {
				if (puzzle[i][j] === '') {
					necessaryClues.push(getRandomClueForColor(solution[i][j], clues));
				}
			}
		}

		numSolutions = getNumSolutions(puzzle, necessaryClues, unknownColors);
	}

	return necessaryClues;
}

function getRandomClueForColor(color, clues) {
	let cluesForColor = [];

	for (let clue of clues) {
		// Maybe only do clue.first because it's less confusing for player
		if (clue.first === color || clue.second === color) {
			cluesForColor.push(clue);
		}
	}

	let index = Math.floor(Math.random() * cluesForColor.length);

	return cluesForColor[index];
}

function getNumSolutions(puzzle, clues, unknownColors) {
	let unknownVariables = getUnknownVariables(puzzle);

	let colorCombinations = getColorCombinations(unknownColors, 0, []);

	let numSolutions = 0;

	// For each color combination check if it is a solution
	for (let colorCombination of colorCombinations) {
		// Setup the known assignments
		let assignments = [];

		assignments.push(...knownAssignments);

		// Setup the unknown assignments
		for (let i = 0; i < colorCombination.length; i++) {
			assignments.push({
				row: unknownVariables[i].row,
				col: unknownVariables[i].col,
				color: colorCombination[i],
			});
		}

		// Check if it is a solution
		if (isSolution(puzzle, clues, assignments)) numSolutions++;
	}

	return numSolutions;
}

function getUnknownVariables(puzzle) {
	let unknownVariables = [];

	for (let row = 0; row < puzzle.length; row++) {
		for (let col = 0; col < puzzle[0].length; col++) {
			if (puzzle[row][col] === '') {
				unknownVariables.push({
					row: row,
					col: col,
					color: '',
				});
			}
		}
	}

	return unknownVariables;
}

function getColorCombinations(colors, index, colorCombinations) {
	let result = [];
	let f = function (array, m = []) {
		if (array.length === 0) {
			result.push(m);
		} else {
			for (let i = 0; i < array.length; i++) {
				let curr = array.slice();
				let next = curr.splice(i, 1);
				f(curr.slice(), m.concat(next));
			}
		}
	};

	f(colors);
	return result;
}

function isSolution(puzzle, clues, assignments) {
	// Check if all the clues are satisfied
	for (let clue of clues) {
		// Check if all the assignments are valid
		for (let assignment of assignments) {
			if (clue.first !== assignment.color && clue.second !== assignment.color)
				continue;

			if (!isSatisfied(clue, assignment, assignments)) return false;
		}
	}

	return true;
}

function isSatisfied(clue, assignment, assignments) {
	switch (clue.name) {
		case 'NEXT_TO':
			return isNextToSatisfied(clue, assignment, assignments);
		case 'SAME_ROW':
			return isSameRowSatisfied(clue, assignment, assignments);
		case 'SAME_COL':
			return isSameColSatisfied(clue, assignment, assignments);
		case 'ORTHO_ADJ':
			return isOrthoAdjSatisfied(clue, assignment, assignments);
		case 'DIAG_ADJ':
			return isDiagAdjSatisfied(clue, assignment, assignments);
		case 'TO_LEFT':
			return isToLeftSatisfied(clue, assignment, assignments);
		case 'TO_RIGHT':
			return isToRightSatisfied(clue, assignment, assignments);
		case 'ABOVE':
			return isAboveSatisfied(clue, assignment, assignments);
		case 'BELOW':
			return isBelowSatisfied(clue, assignment, assignments);
		case 'CORNER':
			return isCornerSatisfied(clue, assignment, assignments);
	}

	return true;
}

function isNextToSatisfied(clue, assignment, assignments) {
	return (
		isOrthoAdjSatisfied(clue, assignment, assignments) ||
		isDiagAdjSatisfied(clue, assignment, assignments)
	);
}

function isOrthoAdjSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (
			otherAssignment.row === assignment.row &&
			otherAssignment.col === assignment.col
		)
			continue;

		if (
			(otherAssignment.row === assignment.row &&
				Math.abs(otherAssignment.col - assignment.col) === 1) ||
			(otherAssignment.col === assignment.col &&
				Math.abs(otherAssignment.row - assignment.row) === 1)
		)
			if (
				(clue.first === assignment.color &&
					clue.second === otherAssignment.color) ||
				(clue.second === assignment.color &&
					clue.first === otherAssignment.color)
			)
				return true;
	}

	return false;
}

function isDiagAdjSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (
			otherAssignment.row === assignment.row &&
			otherAssignment.col === assignment.col
		)
			continue;

		if (
			Math.abs(otherAssignment.row - assignment.row) === 1 &&
			Math.abs(otherAssignment.col - assignment.col) === 1
		)
			if (
				(clue.first === assignment.color &&
					clue.second === otherAssignment.color) ||
				(clue.second === assignment.color &&
					clue.first === otherAssignment.color)
			)
				return true;
	}

	return false;
}

function isSameRowSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (
			otherAssignment.row === assignment.row &&
			otherAssignment.col !== assignment.col
		)
			if (
				(clue.first === assignment.color &&
					clue.second === otherAssignment.color) ||
				(clue.second === assignment.color &&
					clue.first === otherAssignment.color)
			)
				return true;
	}

	return false;
}

function isSameColSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (
			otherAssignment.col === assignment.col &&
			otherAssignment.row !== assignment.row
		)
			if (
				(clue.first === assignment.color &&
					clue.second === otherAssignment.color) ||
				(clue.second === assignment.color &&
					clue.first === otherAssignment.color)
			)
				return true;
	}

	return false;
}

function isToLeftSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (assignment.col < otherAssignment.col)
			if (
				clue.first === assignment.color &&
				clue.second === otherAssignment.color
			)
				return true;
	}

	return false;
}

function isToRightSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (assignment.col > otherAssignment.col)
			if (
				clue.first === assignment.color &&
				clue.second === otherAssignment.color
			)
				return true;
	}

	return false;
}

function isAboveSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (assignment.row < otherAssignment.col)
			if (
				clue.first === assignment.color &&
				clue.second === otherAssignment.color
			)
				return true;
	}

	return false;
}

function isBelowSatisfied(clue, assignment, assignments) {
	for (let otherAssignment of assignments) {
		if (assignment.row > otherAssignment.row)
			if (
				clue.first === assignment.color &&
				clue.second === otherAssignment.color
			)
				return true;
	}

	return false;
}

function isCornerSatisfied(clue, assignment, assignments) {
	if (
		(assignment.row === 0 && assignment.col === 0) ||
		(assignment.row === assignments.length - 1 && assignment.col === 0) ||
		(assignment.row === 0 && assignment.col === assignments[0].length - 1) ||
		(assignment.row === assignments.length - 1 &&
			assignment.col === assignments[0].length - 1)
	)
		return true;
	else return false;
}
