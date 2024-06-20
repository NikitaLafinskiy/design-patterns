// Memento Interface
interface IMemento {
  getState(): string;
}

// Concrete Memento
class Memento implements IMemento {
  private state: string;
  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

// Originator
class Originator {
  state: string;
  constructor(state: string) {
    this.state = state;
  }

  setState(newState: string): string {
    this.state = newState;
    return this.state;
  }

  getSnapshot(): IMemento {
    return new Memento(this.state);
  }

  restore(memento: IMemento): string {
    this.state = memento.getState();
    return this.state;
  }
}

// Caretaker
class Caretaker {
  mementos: IMemento[];
  originator: Originator;
  constructor(originator: Originator) {
    this.mementos = [];
    this.originator = originator;
  }

  backup() {
    this.mementos.push(this.originator.getSnapshot());
  }

  undo() {
    this.mementos.pop();
    this.originator.restore(this.mementos[this.mementos.length - 1]);
  }

  getHistory(): string {
    const history = [];
    for (let i = 0; i < this.mementos.length; i++) {
      history.push(this.mementos[i].getState());
    }

    return history.join(" ");
  }
}

const originator = new Originator("apple");
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.setState("banana");

caretaker.backup();
originator.setState("vegana");

caretaker.backup();
originator.setState("my bob");

caretaker.backup();

console.log(caretaker.getHistory());
console.log(originator.state);
