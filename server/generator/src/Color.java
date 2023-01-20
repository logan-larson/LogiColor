public enum Color {

    WHITE("WHI", "White"),
    COBALT("COB", "Cobalt"),
    ORANGE("ORA", "Orange"),
    BROWN("BRO", "Brown"),
    MUSTARD("MUS", "Mustard"),
    EMERALD("EME", "Emerald"),
    PURPLE("PUR", "Purple"),
    CORAL("COR", "Coral"),
    MAGENTA("MAG", "Magenta"),
    TEAL("TEA", "Teal"),
    BLACK("BLA", "Black"),
    MINT("MIN", "Mint");

    private String shortName;
    private String name;

    private Color(String shortName, String name) {
        this.shortName = shortName;
        this.name = name;
    }

    public String getShortName() {
        return this.shortName;
    }

    public String getName() {
        return this.name;
    }
}
