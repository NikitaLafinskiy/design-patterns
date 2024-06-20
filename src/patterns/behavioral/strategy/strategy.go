package main

import "fmt"

// Context
type ArraySorter struct {
	strategy ISortingStrategy
}

func (s *ArraySorter) Sort(numArr []int) []int {
	return s.strategy.Sort(numArr)
}

// Strategy Interface
type ISortingStrategy interface {
	Sort([]int) []int
}

// Concrete Strategies

// MergeSort struct
type MergeSort struct{}

func (m *MergeSort) Sort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	mid := len(arr) / 2
	left := m.Sort(arr[:mid])
	right := m.Sort(arr[mid:])
	return merge(left, right)
}

func merge(left, right []int) []int {
	result := []int{}
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

// QuickSort struct
type QuickSort struct{}

func (q *QuickSort) Sort(arr []int) []int {
	quick(0, len(arr), arr)
	return arr
}

func quick(s int, e int, arr []int) {
	if (e - s) + 1 <= 1 {
		return
	}

	pivot := arr[e-1]
	left := s

	for i := s; i < e-1; i++ {
		if arr[i] < pivot {
			tmp := arr[left]
			arr[left] = arr[i]
			arr[i] = tmp
			left++
		}
	}

	tmp := arr[left]
	arr[left] = pivot
	arr[e-1] = tmp

	quick(s, left, arr)
	quick(left+1, e, arr)
}	

// InsertionSort struct
type InsertionSort struct{}

func (i *InsertionSort) Sort(arr []int) []int {
	for i := 0; i < len(arr); i++ {
		j := i - 1
		for j >= 0 && arr[j] > arr[j+1]{
			tmp := arr[j]
			arr[j] = arr[j+1]
			arr[j+1] = tmp
			j--
		}
	}

	return arr
}

func main(){
	quickSort := &QuickSort{}
	sorter := &ArraySorter{strategy: quickSort}

	fmt.Println(sorter.Sort([]int{2, 4, 5, 1, 5}))
}