package main

import "fmt"

type BananaPrototypeInterface interface {
	Clone() *BananaPrototype
}

type BananaPrototype struct {
	color string
	size int
}

func (b *BananaPrototype) Clone() *BananaPrototype {
	return &BananaPrototype{color: b.color, size:b.size}
}

func main() {
	original := &BananaPrototype{color:"yellow", size: 10}
	newBanana := original.Clone()

	fmt.Println(newBanana.color, newBanana.size)
}

