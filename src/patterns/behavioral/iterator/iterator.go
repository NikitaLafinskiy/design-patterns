package main

import "fmt"

//* Iterator

type Iterator[T any] interface {
	Next() T
	Current() T
	Valid() bool
	Rewind() 
	Key() int
}

//* ConcreteIterator

type NumberIterator struct {
	position int
	collection *NumberCollection
	reverse bool
}

func NewNumberIterator(collection *NumberCollection, reverse ...bool) *NumberIterator {
	if len(reverse) > 0 {
		return &NumberIterator{position: collection.GetLength()-1, collection:collection, reverse: reverse[0]}
	}
	
	return &NumberIterator{position:0, collection:collection, reverse:false}
}

func (i *NumberIterator) Next() int {
	item := i.collection.GetElements()[i.position]
	
	if i.reverse {
		i.position += -1
	} else if !i.reverse {
		i.position += 1
	}

	return item
}

func (i *NumberIterator) Current() int {
	return i.collection.GetElements()[i.position]
}

func (i *NumberIterator) Valid() bool {
	if(i.reverse) {
		return i.position >= 0
	} else {
		return i.position < i.collection.GetLength()
	}
}

func (i *NumberIterator) Rewind() {
	if(i.reverse){
		i.position = i.collection.GetLength() - 1 
	} else {
		i.position = 0
	}
}

func (i *NumberIterator) Key() int {
	return i.position
}

//* Collection

type INumberCollection interface {
	GetIterator() Iterator[int]
	GetReverseIterator() Iterator[int]
	GetLength() int
	GetElements() []int
	AddElement(el int) 
}

//* ConcreteCollection

type NumberCollection struct {
	items []int
}

func (c *NumberCollection) AddElement(el int) {
	c.items = append(c.items, el)
}

func (c *NumberCollection) GetElements() []int {
	return c.items
}

func (c *NumberCollection) GetLength() int {
	return len(c.items)
}

func (c *NumberCollection) GetIterator() Iterator[int] {
	return NewNumberIterator(c)
}

func (c *NumberCollection) GetReverseIterator() Iterator[int] {
	return NewNumberIterator(c, true)
}

//* Usage

func main(){
	numCollection := &NumberCollection{}
	numCollection.AddElement(1)
	numCollection.AddElement(2)

	iterator := numCollection.GetReverseIterator()

	for iterator.Valid() {
		fmt.Println(iterator.Next())
	}
}