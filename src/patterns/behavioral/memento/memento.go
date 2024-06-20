package main

import "fmt"

// Other
type CursorState struct {
	x int
	y int
	z int
}

type State struct {
	cursorState *CursorState
	textState   string
}

// Originator (Editor)
type IEditorOriginator interface {
	GetSnapshot() *Snapshot
	ChangeCursorState(x int, y int, z int) *CursorState
	AddText(text string) string
	Restore(snapshot *Snapshot)
}

type EditorOriginator struct {
	cursorState *CursorState
	textState   string
}

func (e *EditorOriginator) ChangeCursorState(x int, y int, z int) *CursorState {
	e.cursorState.x, e.cursorState.y, e.cursorState.z = x, y, z
	return e.cursorState
}

func (e *EditorOriginator) AddText(text string) string {
	e.textState += text
	return e.textState
}

func (e *EditorOriginator) GetSnapshot() *Snapshot {
	snapshot := &Snapshot{
		state: &State{
			cursorState: &CursorState{x: e.cursorState.x, y: e.cursorState.y, z: e.cursorState.z},
			textState:   e.textState,
		},
	}
	return snapshot
}

func (e *EditorOriginator) Restore(snapshot *Snapshot) {
	e.cursorState = snapshot.state.cursorState
	e.textState = snapshot.state.textState
}

// Memento (Snapshot)
type ISnapshot interface {
	GetState() *State
}

type Snapshot struct {
	state *State
	next  *Snapshot
	prev  *Snapshot
}

func (s *Snapshot) GetState() *State {
	return s.state
}

// Caretaker (History)
type IHistoryCaretaker interface {
	Undo()
	Backup()
	GetAllOfHistory()
}

type HistoryCaretaker struct {
	editor *EditorOriginator
	head   *Snapshot
	tail   *Snapshot
}

func NewHistoryCaretaker(editor *EditorOriginator) *HistoryCaretaker {
	head := &Snapshot{}
	tail := &Snapshot{}
	head.next = tail
	tail.prev = head
	return &HistoryCaretaker{head: head, tail: tail, editor: editor}
}

func (h *HistoryCaretaker) Undo() {
	if h.tail.prev == h.head {
		fmt.Println("No snapshots to undo")
		return
	}

	prevSnapshot := h.tail.prev.prev
	prevSnapshot.next = h.tail
	h.tail.prev = prevSnapshot
	h.editor.Restore(prevSnapshot)
}

func (h *HistoryCaretaker) Backup() {
	newSnapshot := h.editor.GetSnapshot()
	newSnapshot.prev = h.tail.prev
	newSnapshot.next = h.tail
	h.tail.prev.next = newSnapshot
	h.tail.prev = newSnapshot
}

func (h *HistoryCaretaker) GetAllOfHistory(){
	curr := h.head.next
	for curr != nil && curr != h.tail {
		fmt.Println(curr.state.textState)
		curr = curr.next
	}
}

// func main() {
// 	editor := &EditorOriginator{cursorState: &CursorState{x: 0, y: 0, z: 0}, textState: ""}
// 	history := NewHistoryCaretaker(editor)

// 	editor.AddText("some text blabla")
// 	editor.ChangeCursorState(1, 1, 1)
// 	history.Backup()

// 	editor.AddText(" some more blabla")
// 	history.Backup()


// 	fmt.Println(editor.textState) 

// 	history.GetAllOfHistory()
// }
