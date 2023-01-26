public enum ConstraintType {

    NEXT_TO("is touching"), // next to
    SAME_ROW("is in the same row as"),
    SAME_COL("is in the same column as"),
    ORTHO_ADJ("is adjacent to"), // orthogonally adjacent
    DIAG_ADJ("is diagonal to"), // diagonally adjacent
    TO_LEFT("is somewhere to the left of"),
    TO_RIGHT("is somewhere to the right of"),
    ABOVE("is somewhere above"),
    BELOW("is somewhere below"),
    CORNER("is in a corner");

    private String ruleStr;

    private ConstraintType(String ruleStr) {
        this.ruleStr = ruleStr;
    }

    public String getRuleStr() {
        return this.ruleStr;
    }

}
