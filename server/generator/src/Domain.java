import java.util.ArrayList;

public class Domain {

    private ArrayList<Color> colors;

    public Domain(Color color) {
        this.colors = new ArrayList<Color>();
        this.colors.add(color);
    }

    public Domain(ArrayList<Color> colors) {
        this.colors = colors;
    }

    public ArrayList<Color> getColors() {
        return this.colors;
    }

    public void setColors(ArrayList<Color> colors) {
        this.colors = colors;
    }

    public void addColor(Color color) {
        this.colors.add(color);
    }

    public void removeColor(Color color) {
        this.colors.remove(color);
    }

}
