package main

import "fmt"

// Template
type IReadTemplate interface {
	Process()
	Convert()
}

type ReadTemplate struct {
	data string
	convertedData string
	template IReadTemplate
}

func (r *ReadTemplate) Read() {
	r.template.Convert()
	r.template.Process()
}

func (r *ReadTemplate) Process() {
	fmt.Printf("%v has been processed\n", r.convertedData)
}

func (r *ReadTemplate) Convert(){
}

// Concreate classes	
type JsonConverter struct {
	ReadTemplate
}

func (c *JsonConverter) Convert(){
	c.convertedData = c.data + ".json"
	fmt.Printf("%v has been converted to json\n", c.data)
}

type CsvConverter struct {
	ReadTemplate
}

func (c *CsvConverter) Convert(){
	c.convertedData = c.data + ".csv"
	fmt.Printf("%v has been converted to csv\n", c.data)
}

func main(){
	someData := "hey"
	csvConverter := &CsvConverter{ReadTemplate: ReadTemplate{data: someData}}
	csvConverter.template = csvConverter
	jsonConverter := &JsonConverter{ReadTemplate: ReadTemplate{data: someData}}
	jsonConverter.template = jsonConverter

	csvConverter.Read()
	jsonConverter.Read()
}