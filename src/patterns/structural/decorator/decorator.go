package main

import (
	"fmt"
	"strings"
)

// Component
type PizzaInterface interface {
	GetPrice() int
	GetDescription() string
}

// Concrete Component

type Pizza struct {	
	topping []string;
	price int
}

func (p *Pizza) GetPrice() int {
	return p.price
}

func (p *Pizza) GetDescription() string {
	var sb strings.Builder
	initialString := "The toppings on the pizza include: "
	sb.WriteString(initialString)
	for i := 0; i < len(p.topping); i++ {
		sb.WriteString(p.topping[i])
	}
	return sb.String()
}

// Base Decorator

type PizzaDecorator struct {
	decoratedPizza PizzaInterface
}

func (p *PizzaDecorator) GetPrice() int {
	return p.decoratedPizza.GetPrice()
}

func (p *PizzaDecorator) GetDescription() string {
	return p.decoratedPizza.GetDescription()
}

// Concrete Decorators

type WithCheese struct {
	decoratedPizza PizzaInterface
}

func (p *WithCheese) GetPrice() int {
	return p.decoratedPizza.GetPrice() + 10
}

func (p *WithCheese) GetDescription() string {
	return p.decoratedPizza.GetDescription() + " cheese"
}


type WithMeat struct {
	decoratedPizza PizzaInterface
}

func (p *WithMeat) GetPrice() int {
	return p.decoratedPizza.GetPrice() + 15
}

func (p *WithMeat) GetDescription() string {
	return p.decoratedPizza.GetDescription() + " meat"
}

// Usage

func main() {
	basePizza := &Pizza{topping: []string{"bread"}, price: 100}
	pizzaWithCheese := &WithCheese{decoratedPizza: basePizza}
	fmt.Println(pizzaWithCheese.GetPrice())
	fmt.Println(pizzaWithCheese.GetDescription())
	pizzaWithMeat := &WithMeat{decoratedPizza: pizzaWithCheese}
	fmt.Println(pizzaWithMeat.GetPrice())
	fmt.Println(pizzaWithMeat.GetDescription())
}
