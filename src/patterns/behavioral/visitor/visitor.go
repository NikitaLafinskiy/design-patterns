package main

import "fmt"

// Visitor
type IShapeVisitor interface {
	visitRectangle(r *Rectangle)
	visitTriangle(t *Triangle)
	visitCircle(c *Circle)
}

// Concrete Visitors
type AreaVisitor struct {

}

func (v *AreaVisitor) visitRectangle(r *Rectangle) {
	fmt.Printf("The area of this rectangle is %v", r.w * r.h)
}

func (v *AreaVisitor) visitTriangle(t *Triangle){
	fmt.Printf("The area of this triangle %v", (t.a * t.b ) / 2)
}

func (v *AreaVisitor) visitCircle(c *Circle){
	fmt.Printf("The area of this circle is %v", c.l * c.l)
}

// Component
type IShape interface {
	accept(IShapeVisitor)
	getType() string
}

// Concrete Components
type Rectangle struct {
	w int
	h int
}

func (r *Rectangle) getType() string {
	return "rectangle"
}

func (r *Rectangle) accept(visitor IShapeVisitor){
	visitor.visitRectangle(r)
}

type Circle struct {
	l int
}

func (c *Circle) getType() string {
	return "circle"
}

func (c *Circle) accept(visitor IShapeVisitor){
	visitor.visitCircle(c)
}

type Triangle struct {
	a int
	b int 
}

func (r *Triangle) getType() string {
	return "triangle"
}

func (t *Triangle) accept(visitor IShapeVisitor) {
	visitor.visitTriangle(t)
}

func main(){
	rect := &Rectangle{w: 10, h: 10}
	areaVisitor := &AreaVisitor{}

	rect.accept(areaVisitor)
}