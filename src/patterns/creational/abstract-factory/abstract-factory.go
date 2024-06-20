package main

import "fmt"

// Component interfaces
type IChair interface {
	SitOn()
}

type ISofa interface {
	LieOn()
}

type ITable interface {
	PlaceOn()
}

// Abstract Factories
type IFurnitureFactory interface {
	CreateChair() IChair
	CreateSofa() ISofa
	CreateTable() ITable
}

// Concrete Factories
type VictorianFactory struct {

}

func (f *VictorianFactory) CreateChair() IChair {
	return &VictorianChair{}
}

func (f *VictorianFactory) CreateSofa() ISofa {
	return &VictorianSofa{}
}

func (f *VictorianFactory) CreateTable() ITable {
	return &VictorianTable{}
}

type ModernFactory struct {

}

func (f *ModernFactory) CreateChair() IChair {
	return &ModernChair{}
}

func (f *ModernFactory) CreateSofa() ISofa {
	return &ModernSofa{}
}

func (f *ModernFactory) CreateTable() ITable {
	return &ModernTable{}
}

// Components
type ModernChair struct {

}

func (c *ModernChair) SitOn(){
	fmt.Println("Sitting on a modern chair")
}

type VictorianChair struct {

}

func (c *VictorianChair) SitOn(){
	fmt.Println("Sitting on a victorian chair")
}

type ModernSofa struct {

}

func (s *ModernSofa) LieOn(){
	fmt.Println("Lying on a modern sofa")
}

type VictorianSofa struct {

}

func (s *VictorianSofa)LieOn() {
	fmt.Println("Lying on a victorian sofa")
}

type ModernTable struct {

}

func (t *ModernTable) PlaceOn() {
	fmt.Println("Placed an item on a modern table")
}

type VictorianTable struct {}

func (t *VictorianTable) PlaceOn() {
	fmt.Println("Placed an item on a victorian table")
}

func main(){
	modernFactory := &ModernFactory{}
	modernTable := modernFactory.CreateTable()

	modernTable.PlaceOn()
}