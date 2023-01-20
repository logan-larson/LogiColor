public class Variable {

    private int row;
    private int col;
    private Color value;

    public Variable(int row, int col, Color value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }

    public int getRow() {
        return this.row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return this.col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public Color getValue() {
        return this.value;
    }

    public void setValue(Color value) {
        this.value = value;
    }

    public String toString() {
        return "X" + this.row + this.col;
    }

}
