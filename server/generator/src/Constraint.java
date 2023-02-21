import java.util.ArrayList;

public class Constraint {

    ConstraintType type;
    Color first;
    // ArrayList<String> second;
    Color second;

    public Constraint(ConstraintType type, Color first) {
        this.type = type;
        this.first = first;
        this.second = null;
    }

    public Constraint(ConstraintType type, Color first, Color second) {
        this.type = type;
        this.first = first;
        this.second = second;
    }

    public boolean containsVariable(Color variable) {
        if (second == null)
            return first.equals(variable);
        else
            return first.equals(variable) || second.equals(variable);
    }

    public boolean containsOnlyUnknownColors(ArrayList<Color> unknownColors) {
        if (second == null)
            return unknownColors.contains(first);
        else
            return unknownColors.contains(first) && unknownColors.contains(second);
    }

    public boolean isSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {

        // Switch over each type of clue
        switch (this.type) {
            case NEXT_TO:
                return isNextToSatisfied(assignment, assignments);
            case ORTHO_ADJ:
                return isOrthoAdjSatisfied(assignment, assignments);
            case DIAG_ADJ:
                return isDiagAdjSatisfied(assignment, assignments);
            case SAME_ROW:
                return isSameRowSatisfied(assignment, assignments);
            case SAME_COL:
                return isSameColSatisfied(assignment, assignments);
            case TO_LEFT:
                return isToLeftSatisfied(assignment, assignments);
            case TO_RIGHT:
                return isToRightSatisfied(assignment, assignments);
            case ABOVE:
                return isAboveSatisfied(assignment, assignments);
            case BELOW:
                return isBelowSatisfied(assignment, assignments);
            case CORNER:
                return isCornerSatisfied(assignment, assignments);
            default:
                return true;
        }
    }

    private boolean isNextToSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        return isOrthoAdjSatisfied(assignment, assignments) || isDiagAdjSatisfied(assignment, assignments);
    }

    private boolean isOrthoAdjSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        for (Assignment a : assignments) {
            int r = Integer.parseInt(a.getVariable().substring(1, 2));
            int c = Integer.parseInt(a.getVariable().substring(2, 3));

            // Checks for assignment being orthogonally adjacent to 'a'
            if ((r == row - 1 && c == col) || (r == row + 1 && c == col) || (r == row && c == col - 1)
                    || (r == row && c == col + 1)) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isDiagAdjSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        for (Assignment a : assignments) {
            int r = Integer.parseInt(a.getVariable().substring(1, 2));
            int c = Integer.parseInt(a.getVariable().substring(2, 3));

            // Checks for assignment being diagonally adjacent to 'a'
            if ((r == row - 1 && c == col - 1) || (r == row + 1 && c == col - 1) || (r == row - 1 && c == col + 1)
                    || (r == row + 1 && c == col + 1)) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isSameRowSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));

        for (Assignment a : assignments) {
            int r = Integer.parseInt(a.getVariable().substring(1, 2));

            if (r == row) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isSameColSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        for (Assignment a : assignments) {
            int c = Integer.parseInt(a.getVariable().substring(2, 3));

            if (c == col) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isToLeftSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        for (Assignment a : assignments) {
            int c = Integer.parseInt(a.getVariable().substring(2, 3));

            if (c < col) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isToRightSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        for (Assignment a : assignments) {
            int c = Integer.parseInt(a.getVariable().substring(2, 3));

            if (c > col) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isAboveSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));

        for (Assignment a : assignments) {
            int r = Integer.parseInt(a.getVariable().substring(1, 2));

            if (r < row) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isBelowSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));

        for (Assignment a : assignments) {
            int r = Integer.parseInt(a.getVariable().substring(1, 2));

            if (r > row) {
                if (first == a.getValue() && second == assignment.getValue())
                    return true;
                if (first == assignment.getValue() && second == a.getValue())
                    return true;
            }
        }

        return false;
    }

    private boolean isCornerSatisfied(Assignment assignment, ArrayList<Assignment> assignments) {
        int row = Integer.parseInt(assignment.getVariable().substring(1, 2));
        int col = Integer.parseInt(assignment.getVariable().substring(2, 3));

        if (row == 0 && col == 0) return true;
        if (row == 0 && col == 3) return true;
        if (row == 2 && col == 0) return true;
        if (row == 2 && col == 3) return true;

        return false;
    }

    // Getters and Setters

    public ConstraintType getType() {
        return this.type;
    }

    public void setType(ConstraintType type) {
        this.type = type;
    }

    public Color getFirst() {
        return this.first;
    }

    public void setFirst(Color first) {
        this.first = first;
    }

    public Color getSecond() {
        return this.second;
    }

    public void setSecond(Color second) {
        this.second = second;
    }
}