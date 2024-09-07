package practice;

// Abstraction
abstract class GUI {
    protected Component component;
    public GUI(Component component) {
        this.component = component;
    }

    abstract public void draw();
}

class WindowsGUI extends GUI {
    public WindowsGUI(Component component) {
        super(component);
    }

    public void draw() {
        System.out.println("Currently in a Windows GUI!");
        component.renderComponent();
    }
}

class MacGUI extends GUI {
    public MacGUI(Component component) {
        super(component);
    }

    public void draw() {
        System.out.println("Currently in a Mac GUI!");
        component.renderComponent();
    }
}

// Implementation
abstract class Component {
    String color;
    int size;
    public Component(String color, int size) {
        this.color = color;
        this.size = size;
    }

    abstract public void renderComponent();
}

class WindowsButton extends Component {
    public WindowsButton(String color, int size) {
        super(color, size);
    }

    public void renderComponent() {
        System.out.println("Rendering a windows-type button of size " + size + " and of color " + color);
    }
}

class MacButton extends Component {
    public MacButton(String color, int size) {
        super(color, size);
    }

    public void renderComponent() {
        System.out.println("Rendering a mac-type button of size " + size + " and of color " + color);
    }
}

// class Main {
//     public static void main(String[] args) {
//         MacButton button = new MacButton("Black", 10);
//         WindowsGUI windowsScreen = new WindowsGUI(button);
//         windowsScreen.draw();
//     }
// }