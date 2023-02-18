import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;
import java.util.Scanner;

public class Generator {

    private static boolean getIsPlaying(Scanner scanner) {
        String input = "";

        while (!input.equalsIgnoreCase("y") && !input.equalsIgnoreCase("n")) {
            System.out.print("Would you like to play again? (Y/N): ");
            input = scanner.nextLine();
        }

        return input.equalsIgnoreCase("y");
    }

    private static int getDifficultyLevel(Scanner scanner) {

        System.out.println();
        System.out.println("--------------------Color-Puzzle--------------------");
        System.out.println();
        // Get difficulty level
        int numToRemove = -1;
        while (numToRemove < 1 || numToRemove > 3) {
            System.out.print("Select difficulty level (1 = easy, 2 = medium, 3 = hard): ");
            if (scanner.hasNextInt()) {
                numToRemove = scanner.nextInt();
            }
        }

        scanner.nextLine();

        return numToRemove += 4;
    }

    public static void main(String[] args) throws InterruptedException {


        boolean isHardMode = false;

        if (args.length == 1) {
            isHardMode = args[0].equals("hard");
        }

        boolean isPhysical = false;

        Scanner scanner = new Scanner(System.in);

        boolean isPlaying = true;

        while (isPlaying) {

            if (isPhysical) {
                System.out.println();
                System.out.println("--------------------Color-Puzzle--------------------");
                System.out.println();
            }

            int numToRemove = 6;

            Color[][] solution = new Color[3][4];
            Color[][] puzzle = new Color[3][4];

            ArrayList<Color> colorsList = new ArrayList<>();
            ArrayList<Color> colorsToRemove = new ArrayList<>();

            Random random = new Random();

            // Shuffle the board
            Collections.addAll(colorsList, Color.values());
            Collections.shuffle(colorsList);

            // Put the first Colors in the colors to remove
            for (int i = 0; i < numToRemove; i++) {
                colorsToRemove.add(colorsList.get(i));
                if (!isPhysical) {
                    System.out.print(colorsList.get(i).getShortName() + ",");
                }
            }

            if (!isPhysical) {
                System.out.println();
            }

            // Shuffle the board again
            Collections.shuffle(colorsList);

            // Generate the puzzle by setting a random color in each place on the
            // board
            for (int i = 0; i < solution.length; i++) {
                for (int j = 0; j < solution[i].length; j++) {
                    int colorIndex = random.nextInt(colorsList.size());

                    solution[i][j] = colorsList.get(colorIndex);
                    puzzle[i][j] = colorsToRemove.contains(colorsList.get(colorIndex)) ? null
                            : colorsList.get(colorIndex);

                    colorsList.remove(colorIndex);
                }
            }

            // Print the puzzle
            for (int i = 0; i < puzzle.length; i++) {

                for (int j = 0; j < puzzle[i].length; j++) {
                    String ending = j == puzzle[i].length - 1 ? "" : " | ";
                    String place = puzzle[i][j] == null ? "???" : puzzle[i][j].getShortName();
                    if (!isPhysical) ending = ",";
                    System.out.print(place + ending);
                }

                if (i != puzzle.length - 1)
                    if (isPhysical) System.out.print("\n---------------------\n");

            }
            if (isPhysical) System.out.println();

            // Generate all of the constraints for the solution
            ArrayList<Constraint> constraints = ConstraintGenerator.GenerateConstraints(solution);

            // Generate the clues
            ConstraintSatisfactionProblem csp = new ConstraintSatisfactionProblem(puzzle, solution, colorsToRemove,
                    constraints, isHardMode);

            ArrayList<Constraint> clues = csp.getClues();

            if (isPhysical) {
                System.out.print("\nPress <Enter> to start");
                scanner.nextLine();
            }

            long startTime = System.currentTimeMillis();

            // Print the clues
            int count = 1;
            for (Constraint clue : clues) {
                if (clue.second == null)
                    System.out.printf("\n%d. %s %s", count, clue.first, clue.type.getRuleStr());
                else
                    System.out.printf("\n%d. %s %s %s", count, clue.first, clue.type.getRuleStr(), clue.second);
                count++;
            }

            // scan = new Scanner(System.in);

            // Wait for user input to print the solution
            if (isPhysical) {
                System.out.print("\n\nPress <Enter> to see the solution");
                scanner.nextLine();
            }

            long elapsedTime = System.currentTimeMillis() - startTime;
            double elapsedTimeInSeconds = elapsedTime / 1000.0;

            if (isPhysical) {
                System.out.println();
                System.out.println(elapsedTimeInSeconds + " seconds");

            }
            System.out.println();

            for (int i = 0; i < solution.length; i++) {

                for (int j = 0; j < solution[i].length; j++) {
                    String ending = j == solution[i].length - 1 ? "" : " | ";
                    if (!isPhysical) ending = ",";
                    System.out.print(solution[i][j].getShortName() + ending);
                }

                if (i != solution.length - 1)
                    if (isPhysical) System.out.print("\n---------------------\n");

            }
            if (isPhysical) {
                System.out.println();
                System.out.println();
            }

            if (isPhysical)
                isPlaying = getIsPlaying(scanner);
            else
                isPlaying = false;

        }

        scanner.close();
    }
}