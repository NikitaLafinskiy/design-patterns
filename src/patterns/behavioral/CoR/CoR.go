package main

import (
	"errors"
)

type RequestOptions struct {
	isAuthenticated bool
	isValid bool
	isBanned bool
}

// Handler

type IRequestHandler interface {
	SetNext(handler IRequestHandler) IRequestHandler
	Handle(options *RequestOptions) (string, error)
}

// BaseHandler

type BaseHandler struct {
	next IRequestHandler
}

func (b *BaseHandler) SetNext(handler IRequestHandler) IRequestHandler { 
	b.next = handler
	return b.next
}

func (b *BaseHandler) Handle(options *RequestOptions) (string, error) {
	var err error;

	if b.next != nil {
		return b.Handle(options)
	}

	err = errors.New("there is not next handler available")

	return "", err
}

// ConcreteHandlers

type AuthHandler struct {
	BaseHandler
}

func (a *AuthHandler) Handle(options *RequestOptions) (string, error) {
	var err error;

	if a.next != nil && options.isAuthenticated == true {
		return a.next.Handle(options)
	}

	err = errors.New("user not authenticated")
	return "", err
}

type ValidationHandler struct {
	BaseHandler
}

func (v *ValidationHandler) Handle(options *RequestOptions) (string, error) {
	var err error;

	if v.next != nil && options.isValid == true {
		return v.next.Handle(options)
	}

	err = errors.New("request is not valid")
	return "", err
}

type BanHandler struct {
	BaseHandler
}

func (b *BanHandler) Handle(options *RequestOptions) (string, error) {
	var err error;

	if b.next != nil && options.isBanned == false {
		return b.next.Handle(options)
	}

	err = errors.New("user is banned")
	return "", err
}

type RouteHandler struct {
	BaseHandler
}

func (r *RouteHandler) Handle(options *RequestOptions) (string, error) {
	return "User is authenticated successfully", nil
}

// func main() {
// 	userOptions := &RequestOptions{isAuthenticated: false, isBanned:true, isValid: true}

// 	authHandler := &AuthHandler{}
// 	validationHandler := &ValidationHandler{}
// 	bannedHandler := &BanHandler{}	
// 	routeHandler := &RouteHandler{}

// 	bannedHandler.SetNext(validationHandler).SetNext(authHandler).SetNext(routeHandler)

// 	fmt.Println(bannedHandler.Handle(userOptions))
// }