package practice;

import java.util.List;

// Context
class Sorter {
    private List<Integer> collection;
    private SortingStrategy strategy;

    public Sorter(List<Integer> collection, SortingStrategy strategy) {
        this.collection = collection;
        this.strategy = strategy;
    }

    public List<Integer> sort() {
        return strategy.sort(collection);
    }
}

// Abstract Strategy
interface SortingStrategy {
    List<Integer> sort(List<Integer> collection);
}

// Concrete Strategies
class MergeSort implements SortingStrategy {
    public List<Integer> sort(List<Integer> collection) {
        // some logic
        return collection;
    }
}

class QuickSort implements SortingStrategy {
    public List<Integer> sort(List<Integer> collection) {
        // some logic
        return collection;
    }
}
