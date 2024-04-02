package main

type ICar interface {
	Move(x int, y int) [2]int
}

type Car struct {
	color string;
	name string;
	x int;
	y int;
}

func (c *Car) Move(x int, y int) [2]int {
	c.x += x;
	c.y += y;

	return [2]int{c.x, c.y}
}

type Ferrari struct {
	Car
}

func (f *Ferrari) Move(x int, y int) [2]int {
	f.x += x;
	f.y += y;

	return [2]int{f.x, f.y}
}

func NewFerrari(x int, y int, params ...string) *Ferrari {
	f := &Ferrari{Car: Car{x: x, y:y, color: "red", name:"ferrari"}}

	if(len(params) > 0) {
		f.Car.color = params[0]
	}

	if(len(params) > 1){
		f.Car.name = params[1]
	}

	return f
}

type Lamborghini struct {
Car
}

func NewLamborghini(x int, y int, params ...string) *Lamborghini {
	l := &Lamborghini{Car: Car{x: x, y:y, color:"yellow", name:"lamborghini"}}

	if(len(params) > 0) {
		l.Car.color = params[0]
	}

	if(len(params) > 1) {
		l.Car.name = params[1]
	}

	return l
}


type CarCreator struct {
}

func (c *CarCreator) Create(carType string) ICar {
	switch carType {
	case "lamborghini":
		return NewLamborghini(0, 0)
	case "ferrari":
		return NewFerrari(0, 0)
	default:
		return nil
	}
}

// func main() {
// 	car_1 := (*&CarCreator{}).Create("ferrari")
// 	fmt.Println(car_1.Move(1, 2))
// }