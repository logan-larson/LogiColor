import java.util.ArrayList;

public class ConstraintGenerator {

    public static ArrayList<Constraint> GenerateConstraints(Color[][] solution) {

        ArrayList<Constraint> constraints = new ArrayList<>();

        // For each color, generate all the possible constraints
        for (int row = 0; row < solution.length; row++) {
            for (int col = 0; col < solution[0].length; col++) {
                for (ConstraintType type : ConstraintType.values()) {
                    switch (type) {
                        case NEXT_TO:
                            constraints.addAll(getNextToConstraints(row, col, solution));
                            break;
                        case SAME_ROW:
                            constraints.addAll(getSameRowConstraints(row, col, solution));
                            break;
                        case SAME_COL:
                            constraints.addAll(getSameColConstraints(row, col, solution));
                            break;
                        case ORTHO_ADJ:
                            constraints.addAll(getOrthoAdjConstraints(row, col, solution));
                            break;
                        case DIAG_ADJ:
                            constraints.addAll(getDiagAdjConstraints(row, col, solution));
                            break;
                        case TO_LEFT:
                            constraints.addAll(getToLeftConstraints(row, col, solution));
                            break;
                        case TO_RIGHT:
                            constraints.addAll(getToRightConstraints(row, col, solution));
                            break;
                        case ABOVE:
                            constraints.addAll(getAboveConstraints(row, col, solution));
                            break;
                        case BELOW:
                            constraints.addAll(getBelowConstraints(row, col, solution));
                            break;
                        case CORNER:
                            constraints.addAll(getCornerConstraints(row, col, solution));
                            break;
                    }
                }
            }
        }

        return constraints;
    }

    private static boolean isValidPoint(int oRow, int oCol, int cRow, int cCol) {
        if (oRow == cRow && oCol == cCol)
            return false;

        if (cRow < 0 || cCol < 0)
            return false;

        if (cRow > 2 || cCol > 3)
            return false;

        return true;
    }

    private static ArrayList<Constraint> getNextToConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int i = row - 1; i < row + 2; i++) {
            for (int j = col - 1; j < col + 2; j++) {
                if (!isValidPoint(row, col, i, j))
                    continue;

                constraints.add(new Constraint(ConstraintType.NEXT_TO, solution[row][col],
                        solution[i][j]));
            }
        }

        return constraints;
    }

    private static ArrayList<Constraint> getSameRowConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int j = 0; j < 4; j++) {
            if (!isValidPoint(row, col, row, j))
                continue;

            constraints.add(new Constraint(ConstraintType.SAME_ROW, solution[row][col], solution[row][j]));
        }

        return constraints;
    }

    private static ArrayList<Constraint> getSameColConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int j = 0; j < 3; j++) {
            if (!isValidPoint(row, col, j, col))
                continue;

            constraints.add(new Constraint(ConstraintType.SAME_COL, solution[row][col], solution[j][col]));
        }

        return constraints;
    }

    private static ArrayList<Constraint> getOrthoAdjConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        if (isValidPoint(row, col, row - 1, col))
            constraints.add(new Constraint(ConstraintType.ORTHO_ADJ, solution[row][col], solution[row - 1][col]));
        if (isValidPoint(row, col, row + 1, col))
            constraints.add(new Constraint(ConstraintType.ORTHO_ADJ, solution[row][col], solution[row + 1][col]));
        if (isValidPoint(row, col, row, col - 1))
            constraints.add(new Constraint(ConstraintType.ORTHO_ADJ, solution[row][col], solution[row][col - 1]));
        if (isValidPoint(row, col, row, col + 1))
            constraints.add(new Constraint(ConstraintType.ORTHO_ADJ, solution[row][col], solution[row][col + 1]));

        return constraints;
    }

    private static ArrayList<Constraint> getDiagAdjConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        if (isValidPoint(row, col, row - 1, col - 1))
            constraints.add(new Constraint(ConstraintType.DIAG_ADJ, solution[row][col], solution[row - 1][col - 1]));
        if (isValidPoint(row, col, row + 1, col - 1))
            constraints.add(new Constraint(ConstraintType.DIAG_ADJ, solution[row][col], solution[row + 1][col - 1]));
        if (isValidPoint(row, col, row - 1, col + 1))
            constraints.add(new Constraint(ConstraintType.DIAG_ADJ, solution[row][col], solution[row - 1][col + 1]));
        if (isValidPoint(row, col, row + 1, col + 1))
            constraints.add(new Constraint(ConstraintType.DIAG_ADJ, solution[row][col], solution[row + 1][col + 1]));

        return constraints;
    }

    private static ArrayList<Constraint> getToLeftConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < col; j++) {
                if (!isValidPoint(row, col, i, j))
                    continue;

                constraints.add(new Constraint(ConstraintType.TO_LEFT, solution[i][j], solution[row][col]));
            }
        }

        return constraints;
    }

    private static ArrayList<Constraint> getToRightConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            for (int j = col + 1; j < 4; j++) {
                if (!isValidPoint(row, col, i, j))
                    continue;

                constraints.add(new Constraint(ConstraintType.TO_RIGHT, solution[i][j], solution[row][col]));
            }
        }

        return constraints;
    }

    private static ArrayList<Constraint> getAboveConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < 4; j++) {
                if (!isValidPoint(row, col, i, j))
                    continue;

                constraints.add(new Constraint(ConstraintType.ABOVE, solution[i][j], solution[row][col]));
            }
        }

        return constraints;
    }

    private static ArrayList<Constraint> getBelowConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        for (int i = row + 1; i < 3; i++) {
            for (int j = 0; j < 4; j++) {
                if (!isValidPoint(row, col, i, j))
                    continue;

                constraints.add(new Constraint(ConstraintType.BELOW, solution[i][j], solution[row][col]));
            }
        }

        return constraints;
    }

    private static ArrayList<Constraint> getCornerConstraints(int row, int col, Color[][] solution) {
        ArrayList<Constraint> constraints = new ArrayList<>();

        if (row == 0 && col == 0)
            constraints.add(new Constraint(ConstraintType.CORNER, solution[row][col]));
        if (row == 0 && col == 3)
            constraints.add(new Constraint(ConstraintType.CORNER, solution[row][col]));
        if (row == 2 && col == 0)
            constraints.add(new Constraint(ConstraintType.CORNER, solution[row][col]));
        if (row == 2 && col == 3)
            constraints.add(new Constraint(ConstraintType.CORNER, solution[row][col]));

        return constraints;
    }
}
