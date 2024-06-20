//* Iterator

interface IteratorInterface<T> {
  nextItem(): T;
  current(): T;
  valid(): boolean;
  key(): number;
  rewind(): void;
}

//* Concrete Iterator

class StringIterator implements IteratorInterface<string> {
  private collection: StringCollection;
  private reverse: boolean = false;
  private position: number = 0;

  constructor(collection: StringCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;
    this.rewind();
  }

  nextItem(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  current(): string {
    return this.collection.getItems()[this.position];
  }

  valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getLength();
  }

  rewind(): void {
    this.reverse ? (this.position = this.collection.getLength() - 1) : 0;
  }

  key(): number {
    return this.position;
  }
}

//* Collection

interface ICollection<T> {
  getIterator(): IteratorInterface<T>;
  getItems(): T[];
  getLength(): number;
  addItem(item: T): void;
}

//* ConcreteCollection

class StringCollection implements ICollection<string> {
  private items: string[] = [];

  getIterator() {
    return new StringIterator(this);
  }

  getReverseIterator() {
    return new StringIterator(this, true);
  }

  getItems(): string[] {
    return this.items;
  }

  addItem(item: string): void {
    this.items.push(item);
  }

  getLength(): number {
    return this.items.length;
  }
}

//* Usage

const stringCollection = new StringCollection();
stringCollection.addItem("cock");
stringCollection.addItem("and balls");

const iterator = stringCollection.getReverseIterator();
while (iterator.valid()) {
  console.log(iterator.nextItem());
}
