package main

import "fmt"

// Flyweight
type IBulletType interface {
	Render(x int, y int) string
}

type BulletType struct {
	texture string;
	variant string;
} 

func (b *BulletType) Render(x int, y int) string{
	return fmt.Sprintf("Rendered a bullet of texture %v of variant %v at location %v, %v", b.texture, b.variant, x, y)
}

// FlyweightFactory
type IBulletTypeFactory interface {
	GetBulletType(texture string, variant string) IBulletType
}

type BulletTypeFactory struct {
	bulletTypes []*BulletType
}

func NewBulletTypeFactory(bulletTypes []*BulletType) *BulletTypeFactory {
	return &BulletTypeFactory{bulletTypes:bulletTypes}
}

func (f *BulletTypeFactory) GetBulletType(texture string, variant string) IBulletType {
	for _, i := range f.bulletTypes {
		if i.texture == texture && i.variant == variant {
			return i
		}
	}

	newBulletType := &BulletType{variant:variant, texture:texture}
	f.bulletTypes = append(f.bulletTypes, newBulletType)
	return newBulletType
}

// Component

type IBullet interface {
	Render() string;
	Move(x int, y int) []int
}

type Bullet struct {
	x int;
	y int;
	bulletType IBulletType
}

func (b *Bullet) Render() string {
	return b.bulletType.Render(b.x, b.y)
}

func (b *Bullet) Move(x int, y int) []int {
	b.x = b.x + x
	b.y = b.y + y

	return []int{b.x, b.y}
}

// Context

type IArena interface {
	ShootBullet(texture string, variant string) *Bullet
	Render() []string
}

type Arena struct {
	bullets []*Bullet
	bulletTypeFactory IBulletTypeFactory
}

func NewArena(bullets []*Bullet, bulletTypeFactory IBulletTypeFactory) *Arena {
	return &Arena{bulletTypeFactory:bulletTypeFactory, bullets:bullets}
}

func (a *Arena) ShootBullet(texture string, variant string) *Bullet {
	bulletType := a.bulletTypeFactory.GetBulletType(texture, variant)
	bullet := &Bullet{x:0, y:0, bulletType:bulletType}
	a.bullets = append(a.bullets, bullet)
	return bullet
}

func (a *Arena) Render() []string {
	renderedBullets := make([]string, 0, len(a.bullets))
	for _, i := range a.bullets {
		renderedBullets = append(renderedBullets, i.Render())
	}

	return renderedBullets
}

// Usage

func main() {
	factory := NewBulletTypeFactory([]*BulletType{})
	arena := NewArena([]*Bullet{}, factory)

	arena.ShootBullet("texture_1", "1")
	arena.ShootBullet("texture_1", "2")

	for _, bullet := range arena.Render() {
		fmt.Println(bullet)
	}

	for _, bulletType := range factory.bulletTypes {
		fmt.Println(*bulletType)
	}
}