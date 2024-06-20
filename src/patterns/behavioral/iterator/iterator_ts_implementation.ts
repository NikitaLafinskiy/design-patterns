class ArrayIterator<T> {
  private currIndex: number = 0;
  private arr: T[];

  constructor(arr: T[]) {
    this.arr = arr;
  }

  next(): IteratorResult<T> {
    if (this.currIndex < this.arr.length) {
      const returnObj = { value: this.arr[this.currIndex], done: false };
      this.currIndex += 1;

      return returnObj;
    } else {
      return { value: null, done: true };
    }
  }
}

const iterableArr = new ArrayIterator<number>([1, 2, 3, 4]);
// console.log(iterableArr.next());
// let done = false;
// while (!done) {
//   let result = iterableArr.next();
//   if (result.done) {
//     done = result.done;
//   }
//   console.log(result.value, result.done);
// }

function* reverseIter(arr: number[]) {
  let i = arr.length - 1;
  while (i >= 0) {
    yield arr[i];
    i--;
  }
}

function* arrIter(arr: number[]) {
  let i = 0;
  while (i < arr.length) {
    yield arr[i];
    i++;
  }
}

let gen = reverseIter([1, 2, 3]);
let done = false;
while (!done) {
  let result = gen.next();
  if (result.done) {
    done = result.done;
  }
  console.log(result.value);
}
