public class Assignment {

    private String variable;
    private Color value;

    public Assignment(String variable, Color value) {
        this.variable = variable;
        this.value = value;
    }

    public String getVariable() {
        return this.variable;
    }

    public void setVariable(String variable) {
        this.variable = variable;
    }

    public Color getValue() {
        return this.value;
    }

    public void setValue(Color value) {
        this.value = value;
    }

}
