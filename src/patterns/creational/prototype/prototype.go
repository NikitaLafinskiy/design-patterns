package main

import "fmt"

type IFile interface {
	Print() string
	Clone() IFile
}

type File struct {
	text string
}

func (f *File) Print() string {
	return f.text
}

func (f *File) Clone() IFile {
	clonedFile := &File{text: f.text}
	return clonedFile
}

type IFolder interface {
	Print() []string
	Clone() IFolder
}

type Folder struct {
	name     string
	children []IFile
}

func (f *Folder) Print() []string {
	listOfText := make([]string, 0, len(f.children))
	for _, file := range f.children {
		listOfText = append(listOfText, file.Print())
	}

	return listOfText
}

func (f *Folder) Clone() IFolder {
	clonedChildren := make([]IFile, 0, len(f.children))
	for _, f := range f.children {
		clonedChildren = append(clonedChildren, f.Clone())
	}

	clonedFolder := &Folder{name: f.name, children: clonedChildren}
	return clonedFolder
}

func main() {
	file_1 := &File{text: "myfile1"}
	file_2 := &File{text: "myfil2"}

	folder_1 := &Folder{name: "folderwithfiles", children: []IFile{file_1, file_2}}
	folder_1_2 := folder_1.Clone()
	fmt.Println(folder_1_2.Print())
}