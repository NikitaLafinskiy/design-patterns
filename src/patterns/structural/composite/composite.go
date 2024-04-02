package main

import (
	"errors"
	"fmt"
)

type Product interface {
	GetPrice() float64
}

type Phone struct {
	price float64
	name string
	id int
}

func NewPhone(price float64, name string, id int) *Phone {
	return &Phone{price: price, name: name, id: id}
}

func (p *Phone) GetPrice() float64 {
	return p.price
}

type Laptop struct {
	price float64
	name string
	id int
}

func NewLaptop(price float64, name string, id int) *Laptop {
	return &Laptop{price:price, name:name, id:id}
}

func (l *Laptop) GetPrice() float64 {
	return l.price
}

type CompositeProduct struct {
	children []Product
}

func NewCompositeProduct(children ...Product) *CompositeProduct {
	compositeProduct := &CompositeProduct{}
	if children != nil {
		compositeProduct.children = append(compositeProduct.children, children...)
	}
	return compositeProduct
}

func (c *CompositeProduct) add(product Product) []Product {
	c.children = append(c.children, product)
	return c.children
}

func (c *CompositeProduct) remove(product Product) ([]Product, error) {
	var err error
	indexOfProduct := Index(c.children, product)
	if indexOfProduct != -1 {
		return RemoveElement(c.children, indexOfProduct), nil
	} else {
		err = errors.New("Element is out of bounds")
		return nil, err
	}
}

func (c *CompositeProduct) getPrice() float64 {
	var price float64 = 0
	for _, child := range c.children {
		price += child.GetPrice()
	}

	return price
}


func Index(arr []Product, item Product) int {
	for i, v := range arr{
		if(v == item) {
			return i
		}
	}

	return -1
}

func RemoveElement(arr []Product, index int) []Product {
	for i := 0; i < len(arr); i++ {
		if (i > index) {
			arr[i-1] = arr[i]
		}
	}

	return arr[:len(arr)-1]
}

func main(){
	compositeProductInstance := NewCompositeProduct()
	compositeProductInstance.add(&Phone{1000, "iPhone", 1})
	compositeProductInstance.add(&Laptop{10000, "MacBook", 2})
	totalPrice := compositeProductInstance.getPrice()
	fmt.Println(totalPrice)
}