import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;

public class ConstraintSatisfactionProblem {

    // key: X11, X31, X34 | value: variable at location
    private HashMap<String, Variable> variables;
    // key: D11, D31, D34 | value: domain at location
    private HashMap<String, Domain> domains;

    private ArrayList<Constraint> constraints;

    private ArrayList<Assignment> knownAssignments;
    private ArrayList<Assignment> assignments;

    private ArrayList<Constraint> clues;

    public ConstraintSatisfactionProblem(Color[][] puzzle, Color[][] solution, ArrayList<Color> unknownColors,
            ArrayList<Constraint> constraints, boolean isHardMode) throws RuntimeException {
        setupVariablesAndDomains(puzzle, unknownColors);
        setupConstraintsAndAssignments(constraints, puzzle);

        setupClues(puzzle, solution, unknownColors, isHardMode);
    }

    private void setupVariablesAndDomains(Color[][] puzzle, ArrayList<Color> unknownColors) {

        int numRows = puzzle.length;
        int numCols = puzzle[0].length;

        variables = new LinkedHashMap<>();
        domains = new LinkedHashMap<>();

        // Loop through puzzle to set variables and domains for each space
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                if (puzzle[row][col] == null) {
                    // If the space is unknown set variable value to null and
                    // set domain to include the unknown colors
                    variables.put("X" + row + col, new Variable(row, col, null));
                    domains.put("D" + row + col, new Domain(unknownColors));
                } else {
                    // If the space is known set variable to hold value and
                    // limit domain
                    variables.put("X" + row + col, new Variable(row, col, puzzle[row][col]));
                    domains.put("D" + row + col, new Domain(puzzle[row][col]));
                }
            }
        }
    }

    private void setupConstraintsAndAssignments(ArrayList<Constraint> constraints, Color[][] puzzle) {
        this.constraints = constraints;
        this.clues = new ArrayList<>();
        this.knownAssignments = new ArrayList<>();
        this.assignments = new ArrayList<>();

        for (int row = 0; row < puzzle.length; row++) {
            for (int col = 0; col < puzzle[0].length; col++) {
                if (puzzle[row][col] != null) {
                    this.knownAssignments.add(new Assignment("X" + row + col, puzzle[row][col]));
                }
            }
        }
    }

    private void setupClues(Color[][] puzzle, Color[][] solution, ArrayList<Color> unknownColors, boolean isHardMode) throws RuntimeException {

        if (isHardMode) {
            // Remove all constraints that don't have only unknown colors
            ArrayList<Constraint> newConstraints = new ArrayList<>();
            for (Constraint constraint : this.constraints) {
                if (constraint.containsOnlyUnknownColors(unknownColors)) {
                    newConstraints.add(constraint);
                }
            }
            this.constraints = newConstraints;
        }

        int numSolutions = 0;
        int maxChecks = 720;
        while (numSolutions != 1 && maxChecks > 0) {

            clues.clear();

            // Add random clues
            for (int row = 0; row < puzzle.length; row++) {
                for (int col = 0; col < puzzle[0].length; col++) {
                    if (puzzle[row][col] == null) {
                        this.clues.add(getRandomConstraintForColor(solution[row][col]));
                    }
                }
            }

            // Search for all possible solutions give the clues
            numSolutions = getNumSolutions(puzzle, unknownColors);

            maxChecks--;
        }

        if (maxChecks <= 0) {
            throw new RuntimeException("Could not find a solution for the puzzle");
        }
    }

    private Constraint getRandomConstraintForColor(Color color) {

        // Get all relative constraints for the color
        ArrayList<Constraint> cluesForColor = new ArrayList<>();

        for (Constraint constraint : this.constraints) {
            if (constraint.containsVariable(color)) {
                cluesForColor.add(constraint);
            }
        }

        // Pick a random constraint from this list
        Random random = new Random();

        int index = random.nextInt(cluesForColor.size());

        return cluesForColor.get(index);
    }

    private int getNumSolutions(Color[][] puzzle, ArrayList<Color> unknownColors) {

        // Get the positions of all the unknown colors
        ArrayList<Variable> unknownVariables = new ArrayList<>();
        for (int row = 0; row < puzzle.length; row++) {
            for (int col = 0; col < puzzle[0].length; col++) {
                if (puzzle[row][col] == null) {
                    unknownVariables.add(new Variable(row, col, null));
                }
            }
        }

        int numSolutions = 0;

        // Generate all the possible color combinations of the unknown colors
        ArrayList<Color> colors = new ArrayList<>(unknownColors);

        ArrayList<ArrayList<Color>> colorCombinations = new ArrayList<>();

        getColorCombinations(colors, 0, colorCombinations);

        // For each combination chech if it is a solution to the puzzle
        for (ArrayList<Color> colorCombination : colorCombinations) {

            // System.out.println(colorCombination);

            // Clear assignments
            this.assignments.clear();
            // Add the known variables to assignments
            this.assignments.addAll(this.knownAssignments);

            for (int k = 0; k < colorCombination.size(); k++) {
                // This adds a color to the
                // int varIdx = (i + j) % unknownVariables.size();
                this.assignments.add(new Assignment(unknownVariables.get(k).toString(),
                        colorCombination.get(k)));
            }

            if (isConsistent()) {
                numSolutions++;
                // System.out.println("\nSolution #" + numSolutions);
                // for (Assignment a : this.assignments) {
                // System.out.println(a.getVariable() + a.getValue());
                // }
            }

        }

        // System.out.println("NumSolutions: " + numSolutions);

        // return 1;
        return numSolutions;
    }

    private ArrayList<ArrayList<Color>> getColorCombinations(ArrayList<Color> colors, int index,
            ArrayList<ArrayList<Color>> colorCombinations) {
        if (index == colors.size() - 1) {
            colorCombinations.add(new ArrayList<>(colors));
        } else {
            for (int i = index; i < colors.size(); i++) {
                Collections.swap(colors, index, i);
                getColorCombinations(colors, index + 1, colorCombinations);
                Collections.swap(colors, index, i);
            }
        }

        return colorCombinations;
    }

    private boolean isConsistent() {
        // For every clue, make sure all the assignments are satisfied
        for (Constraint clue : this.clues) {
            for (Assignment assignment : this.assignments) {
                // If the clue doesn't contain the color then don't bother with it
                if (!clue.containsVariable(assignment.getValue()))
                    continue;

                // If the clue isn't satisfied by the assignment then this isn't
                // a solution to the puzzle
                if (!clue.isSatisfied(assignment, this.assignments))
                    return false;
            }
        }
        return true;
    }

    public ArrayList<Constraint> getClues() {
        return this.clues;
    }

}
