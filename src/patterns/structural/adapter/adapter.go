package main

import (
	"errors"
	"fmt"
)

// Target Interface

type PaymentService interface {
Withdraw(amount int32) (int32, error)
TopUp(amount int32) (int32, error)
ShowBalance() (int32, error)
}

// Adaptee

type PayPalService struct{
	balance int32
}

func (s *PayPalService) GetCash(amount int32) int32 {
	s.balance -= amount
	return s.balance
}

func (s *PayPalService) IncreaseCash(amount int32) int32 {
	s.balance += amount
	return s.balance
}

func (s *PayPalService) SeeCash() int32 {
	return s.balance
}

// Adaptee

type StripeService struct {
	balance int32
}

func (s *StripeService) ReceiveMoney(amount int32) int32 {
	s.balance -= amount
	return s.balance
}

func (s *StripeService) IncreaseMoney(amount int32) int32 {
	s.balance += amount
	return s.balance
}

func (s *StripeService) FindMoney() int32 {
	return s.balance
}

// Adapter

type PaymentAdapter struct {
	paymentService interface{}
}

func NewPaymentAdapter(paymentService interface{}) *PaymentAdapter {
	return &PaymentAdapter{paymentService: paymentService}
}

func (p *PaymentAdapter) Withdraw(amount int32) (int32, error) {
	var err error

	switch service := p.paymentService.(type) {
	case *StripeService: // dereferencing
		return service.ReceiveMoney(amount), nil
	case *PayPalService: // dereferencing
		return service.GetCash(amount), nil
	default:
		err = errors.New("No class supplied")
		return 0, err
	}
}

func (p *PaymentAdapter) TopUp(amount int32) (int32, error) {
	var err error

	switch service := p.paymentService.(type) {
	case *StripeService:
		return service.IncreaseMoney(amount), nil
	case *PayPalService:
		return service.IncreaseCash(amount), nil
	default:
		err = errors.New("No class supplied")
		return 0, err
	}
}

func (p *PaymentAdapter) ShowBalance() (int32, error) {
	var err error

	switch service := p.paymentService.(type){
	case *StripeService:
		return service.FindMoney(), nil
	case *PayPalService:
		return service.SeeCash(), nil
	default:
		err = errors.New("No class supplied")
		return 0, err
	}
}

func main(){
	stripe := &StripeService{balance: 2000}
	paymentService := NewPaymentAdapter(stripe)

	val, err := paymentService.ShowBalance()
	if(err != nil){
		fmt.Printf("Something went wrong, %v", err)
	}

	fmt.Println(val)
}
