package practice;

// Visitor
interface ShapeVisitor {
    void visit(Rectangle rect);
    void visit(Triangle tri);
    void visit(Circle ci);
}

class SumVisitor implements ShapeVisitor {
    public void visit(Rectangle rect) {
        System.out.println(rect.getA() + rect.getB());
    }

    public void visit(Triangle tri) {
        System.out.println(tri.getA() + tri.getB() + tri.getC());
    }

    public void visit(Circle ci) {
        System.out.println(ci.getLen());
    }
}

// Components
interface Shape {
    int getArea();
    void accept(ShapeVisitor visitor);
}

class Rectangle implements Shape {
    private int a;
    private int b;

    public Rectangle(int a, int b) {
        this.a = a;
        this.b = b;
    }

    public int getA() {
        return a;
    }

    public int getB() {
        return b;
    }

    public int getArea() {
        return a * b;
    }

    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

class Triangle implements Shape {
    private int a;
    private int b;
    private int c;

    public Triangle(int a, int b, int c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public int getA() {
        return a;
    }

    public int getB() {
        return b;
    }

    public int getC() {
        return c;
    }

    public int getArea() {
        return (a * b) / c;
    }

    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

class Circle implements Shape {
    private static final double PI = 3.14; 
    private double len;

    public Circle(double len) {
        this.len = len;
    }

    public int getLen() {
        return (int) len;
    }

    public int getArea() {
        return (int) Math.floor(len * PI);
    }

    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}