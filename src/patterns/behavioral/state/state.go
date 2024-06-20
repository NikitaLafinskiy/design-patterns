package main

import "fmt"

// Context
type VimContext struct {
	currState IVimState
	content string

	defaultState IVimState
	visualState IVimState
	commandState IVimState
	insertState IVimState
}

func newVimContext() *VimContext {
	vimContext := &VimContext{}

	baseState := BaseState{vimContext: vimContext}
	
	defaultState := &DefaultState{baseState}
	visualState := &VisualState{baseState}
	commandState := &CommandState{baseState}
	insertState := &InsertState{baseState}

	vimContext.defaultState = defaultState
	vimContext.visualState = visualState
	vimContext.commandState = commandState
	vimContext.insertState = insertState
	
	vimContext.currState = defaultState
	vimContext.content = ""

	return vimContext
}

func (c *VimContext) SetState(state IVimState) {
	c.currState = state
}

func (c *VimContext) CommandLine() {
	c.currState.CommandLine()
}

func (c *VimContext) Visual()  {
	c.currState.Visual()
}

func (c *VimContext) Default() {
	c.currState.Default()
}

func (c *VimContext) Insert() {
	c.currState.Insert()
}

func (c *VimContext) WriteLetter(letter string){
	c.currState.WriteLetter(letter)
}

// State
type IVimState interface {
	CommandLine()
	Visual()
	Default()
	Insert()

	WriteLetter(letter string)
}

type BaseState struct {
	vimContext *VimContext
}

func (s *BaseState) CommandLine() {
	fmt.Println("Unable to go into the command mode from this state")
}

func (s *BaseState) Visual(){
	fmt.Println("Unable to go into the visual mode from this state")
}

func (s *BaseState) Insert(){
	fmt.Println("Unable to go into the insert mode from this state")
}

func (s *BaseState) Default(){
	s.vimContext.SetState(s.vimContext.defaultState)
}

func (s *BaseState) WriteLetter(letter string) {
	fmt.Println("Unable to write in the current mode")
}

type DefaultState struct {
	BaseState
}

func (s *DefaultState) CommandLine() {
	s.vimContext.SetState(s.vimContext.commandState)
}

func (s *DefaultState) Visual() {
	s.vimContext.SetState(s.vimContext.visualState)
}

func (s *DefaultState) Insert(){
	s.vimContext.SetState(s.vimContext.insertState)
}

func (s *DefaultState) Default() {
	fmt.Println("Already in that state")
}

type VisualState struct {
	BaseState
}

func (s *VisualState) Visual(){
	fmt.Println("Already in that state")
}

type InsertState struct {
	BaseState
}

func (s *InsertState) Insert(){
	fmt.Println("Already in that state")
}

func (s *InsertState) WriteLetter(letter string) {
	s.vimContext.content += letter
}

type CommandState struct {
	BaseState
}

func (s *CommandState) CommandLine(){
	fmt.Println("Already in that state")
}

// func main() {
// 	vim := newVimContext()
// 	vim.Insert()
// 	vim.WriteLetter("h")
// 	vim.WriteLetter("e")
// 	vim.WriteLetter("l")
// 	vim.WriteLetter("l")
// 	vim.WriteLetter("o")
// 	fmt.Println(vim.content)
// 	vim.Default()
// 	vim.Visual()
// }
