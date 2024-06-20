// Visitor
interface IShapeVisitor {
  visitRectangle(rect: Rectangle): void;
  visitTriangle(tr: Triangle): void;
}

// Concrete Visitor
class AreaVisitor implements IShapeVisitor {
  visitRectangle(rect: Rectangle): void {
    console.log("The area of the rectangle is " + rect.width * rect.height);
  }

  visitTriangle(tr: Triangle): void {
    console.log("The area of the triangle is " + (tr.a * tr.b) / 2);
  }
}

// Components
interface IShape {
  getType(): string;
  accept(visitor: IShapeVisitor): void;
}

// Concrete Components
class Rectangle implements IShape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getType(): string {
    return "rectangle";
  }

  accept(visitor: IShapeVisitor): void {
    visitor.visitRectangle(this);
  }
}

class Triangle implements IShape {
  a: number;
  b: number;
  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  getType(): string {
    return "triangle";
  }

  accept(visitor: IShapeVisitor): void {
    visitor.visitTriangle(this);
  }
}

const rectangle = new Rectangle(10, 10);
const areaVisitor = new AreaVisitor();

rectangle.accept(areaVisitor);
