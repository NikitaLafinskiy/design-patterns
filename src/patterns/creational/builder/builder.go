package main

import "fmt"

type IHouse interface {
	GetWindowCount() int
	GetDoorCount() int
	GetHasPool() bool
	GetHasTrees() bool
}

type House struct {
	windowCount int;
	doorCount int;
	hasPool bool;
	hasTrees bool;
}

func NewHouse(windowCount int, doorCount int, hasPool bool, hasTrees bool) *House {
	return &House{windowCount: windowCount, doorCount: doorCount, hasPool:hasPool, hasTrees: hasTrees}
}

func (h *House) GetWindowCount() int {
	return h.windowCount
}

func (h *House) GetDoorCount() int {
	return h.doorCount
}

func (h *House) GetHasPool() bool {
	return h.hasPool
}

func (h *House) GetHasTrees() bool {
	return h.hasTrees
}

type IHouseBuilder interface {
	Build() *House
	SetWindowCount(windowCount int) *HouseBuilder
	SetDoorCount(doorCount int) *HouseBuilder
	SetHasPool(hasPool bool) *HouseBuilder
	SetHasTrees(hasTrees bool) *HouseBuilder
}

type HouseBuilder struct {
	House *House
}

func NewHouseBuilder() *HouseBuilder {
	house := &House{windowCount: 0, doorCount: 0, hasPool: false, hasTrees: false}
	return &HouseBuilder{House: house}
}

func (h *HouseBuilder) SetWindowCount(windowCount int) *HouseBuilder {
	h.House.windowCount = windowCount
	return h
}

func (h *HouseBuilder) SetDoorCount(doorCount int) *HouseBuilder {
	h.House.doorCount = doorCount
	return h
}

func (h *HouseBuilder) SetHasPool(hasPool bool) *HouseBuilder {
	h.House.hasPool = hasPool
	return h
}

func (h *HouseBuilder) SetHasTrees(hasTrees bool) *HouseBuilder {
	h.House.hasTrees = hasTrees
	return h
}

func (h *HouseBuilder) Build() *House {
	return h.House
}

func main() {
	house_builder := NewHouseBuilder()
	house_builder.SetDoorCount(1)
	house_builder.SetWindowCount(2)

	fmt.Println(house_builder.Build().GetDoorCount())
}