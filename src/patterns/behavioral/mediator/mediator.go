package main

import "fmt"

// Mediator
type IMediator interface {
	Notify(sender interface{}, event string) string
}

type BookingMediator struct {
	bookingComponent *BookingComponent
	notificationComponent *NotificationComponent
}

func NewBookingMediator(bookingComponent *BookingComponent, notificationComponent *NotificationComponent) *BookingMediator {
	mediator := &BookingMediator{bookingComponent, notificationComponent}
	bookingComponent.SetMediator(mediator)
	notificationComponent.SetMediator(mediator)
	return mediator
}

func (m *BookingMediator) Notify(sender interface{}, event string) string {
	if event == "ReserveRoom" {
		return m.notificationComponent.SendMessage(m.bookingComponent.username, m.bookingComponent.reservationNumber)
	}

	return "Unknown notification"
}

// Booking Component
type BookingComponent struct {
	reservationNumber int
	username string
	mediator *BookingMediator
}

func (c *BookingComponent) SetMediator(mediator *BookingMediator) {
	c.mediator = mediator
}

func (c *BookingComponent) ReserveRoom() string {
	return c.mediator.Notify(c, "ReserveRoom")
}

// Notification Component
type NotificationComponent struct {
	mediator *BookingMediator
}

func (c *NotificationComponent) SetMediator(mediator *BookingMediator) {
	c.mediator = mediator
}

func (c *NotificationComponent) SendMessage(username string, reservationNumber int) string {
	return fmt.Sprintf("The message is sent to %v, the reservation is confirmed and the number of the reservation is %v", username, reservationNumber)
}

func main(){
	notifier := &NotificationComponent{}
	booking := &BookingComponent{username: "nikita", reservationNumber: 123}

	NewBookingMediator(booking, notifier)
	fmt.Println(booking.ReserveRoom())
}