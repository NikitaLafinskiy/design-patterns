package main

import "fmt"

// Publisher
type ChatRoom struct {
	users []IUser
	messages []string
}

func NewChatRoom(users []IUser) *ChatRoom {
	chatRoom := &ChatRoom{users: users}

	for _, u := range users {
		u.SetChatRoom(chatRoom)
	}

	return chatRoom
}

func (r *ChatRoom) addUser(user IUser) {
	isAdded := false
	for _, u := range r.users {
		if u == user {
			isAdded = true
		}
	}

	if !isAdded {
		r.users = append(r.users, user)
		user.SetChatRoom(r)
	}
}

func (r *ChatRoom) removeUser(user IUser) {
	filteredUsersArr := make([]IUser, 0, len(r.users)-1)
	for _, u := range r.users {
		if u != user {
			filteredUsersArr = append(filteredUsersArr, u)
		}
	}

	r.users = filteredUsersArr
}

func (r *ChatRoom) NotifyUsers(message string, sentBy IUser){
	r.messages = append(r.messages, message)
	for _, u := range r.users {
		if u != sentBy {
			u.Update(message)
		}
	}
}

func (r *ChatRoom) MakeAnnouncement(message string){
	FibonacciCalc(10)
	for _, u := range r.users {
		u.Update(message)
	}
}

// Subscribers
type IUser interface {
	Update(message string)
	SendMessage(message string)
	SetChatRoom(store *ChatRoom)
}

type User struct {
	name string
	chatRoom *ChatRoom
}

func (u *User) SetChatRoom(room *ChatRoom){
	u.chatRoom = room
}

func (u *User) SendMessage(message string){
	u.chatRoom.NotifyUsers(message, u)
}

func (u *User) Update(message string){
	fmt.Printf("Message received by user %v: %v \n", u.name, message)
}

// Client

// Fibonacci Sequence
func FibonacciCalc(num int) int {
	if num <= 1 {
		return num
	}

	return FibonacciCalc(num-1) + FibonacciCalc(num-2)
}

// func main(){
// 	user1 := &User{name: "user1"}
// 	user2 := &User{name:"user2"}
// 	user3 := &User{name:"user3"}
// 	user4 := &User{name:"user4"}

// 	chatRoom := NewChatRoom([]IUser{user1, user2, user3})
// 	chatRoom.addUser(user4)

// 	user1.SendMessage("hey")

// 	fmt.Println(chatRoom.messages)

// 	chatRoom.MakeAnnouncement("I HAVE GOT AN ANNOUNCEMENT TO MAKE")
// }
