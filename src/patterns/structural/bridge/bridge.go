package main

import "fmt"

// Implementation

type DB interface {
	find(string) string
	update(string) string
	delete(string) string
}

// ConcreteImplementations

type Mongo struct {

}

func (m *Mongo) find(search string) string {
	return fmt.Sprintf("Found results in mongo, searched for %v", search)
}

func (m *Mongo) update(search string) string {
	return fmt.Sprintf("Updated results in mongo, searched for %v", search)
}

func (m *Mongo) delete(search string) string {
	return fmt.Sprintf("Deleted results in mongo, searched for %v", search)
}

type Porstgres struct {

}

func (p *Porstgres) find(search string) string {
	return fmt.Sprintf("Found results in porstgres, searched for %v", search)
}

func (p *Porstgres) update(search string) string {
	return fmt.Sprintf("Updated results in porstgres, searched for %v", search)
}

func (p *Porstgres) delete(search string) string {
	return fmt.Sprintf("Deleted results in porstgres, searched for %v", search)
}

// Abstraction

type ApiAbstraction interface {
	get(string) string
	post(string) string
	delete(string) string
}

// RefinedAbstractions

type UserApi struct {
	db DB
}

func (u *UserApi) get(search string) string {
	return u.db.find(search)
}

func (u *UserApi) post(search string) string {
	return u.db.update(search)
}

func (u *UserApi) delete(search string) string {
	return u.db.delete(search)
}

// Usage

// func main(){
// 	userApi := &UserApi{db: &Mongo{}}
// 	fmt.Println(userApi.get("someUser"))
// }