package main

import "fmt"

// Command interface
type ICommand interface {
	Execute(text string) string
}

// Concrete Commands
type CopyCommand struct {
	receiver IReceiver
}

func (c *CopyCommand) Execute(text string) string {
	return c.receiver.Copy(text)
}

type PasteCommand struct {
	receiver IReceiver
}

func (p *PasteCommand) Execute(text string) string {
	return p.receiver.Paste(text)
}

// Receiver
type IReceiver interface {
	Copy(text string) string;
	Paste(text string) string
}

type Receiver struct {

}

func (r *Receiver) Copy(text string) string {
	return fmt.Sprintf("Copied a string: %v", text)
}

func (r *Receiver) Paste(text string) string {
	return fmt.Sprintf("Pasted a string: %v", text)
}

// Invoker
type ITextline interface {
	SetCommand(command ICommand) 
	Call() string
	SetText(text string)
}

type Textline struct {
	command ICommand
	text string
}

func (t *Textline) SetCommand(command ICommand) {
	t.command = command
}

func (t *Textline) SetText(text string){
	t.text = text
}

func (t *Textline) Call() string {
	return t.command.Execute(t.text)
}

func main(){
	receiverInstance := &Receiver{}
	copyCommand := &CopyCommand{receiver: receiverInstance}
	pasteCommand := &PasteCommand{receiver: receiverInstance}

	textlineApp := &Textline{command:copyCommand, text: "heyhey"}
	textlineApp.SetCommand(pasteCommand)

	fmt.Println(textlineApp.Call())
}