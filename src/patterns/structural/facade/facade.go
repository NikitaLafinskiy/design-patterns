package main

import (
	"fmt"
	"net/http"
)

type IHttpFacade interface {
	GetAndListen()
}

type HttpFacade struct {
	server *http.Server
	mux *http.ServeMux
}

func NewHttpFacade() *HttpFacade {
	mux := http.NewServeMux()
	server := &http.Server{
		Addr: ":6969",
		Handler:mux,
	}

	return &HttpFacade{mux:mux, server:server}
}

func (h *HttpFacade) GetAndListen() {
	h.mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	h.server.ListenAndServe()
}

func main() {
	server := NewHttpFacade()
	server.GetAndListen()
}