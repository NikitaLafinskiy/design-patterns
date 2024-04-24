interface IGuitar {
  play(): string;
  clone(): IGuitar;
}

class Guitar implements IGuitar {
  color: string;
  size: number;
  model: string;
  person: Person | undefined;

  constructor(color: string, size: number, model: string, person?: Person) {
    this.color = color;
    this.size = size;
    this.model = model;
    this.person = person ? person : undefined;
  }

  play(): string {
    return `Playing a ${this.color} ${this.model} guitar that is of size ${
      this.size
    }, it is played by a person with a name of ${
      this.person?.name ? this.person.name : "An unknown person"
    }`;
  }

  clone(): IGuitar {
    const guitarClone = Object.create(this);
    for (let prop in this) {
      guitarClone[prop] = this[prop];
    }

    // guitarClone.person = { ...this.person, guitar: { ...this } };

    return guitarClone;
  }
}

class Person {
  guitar: IGuitar;
  name: string;
  constructor(guitar: IGuitar, name: string) {
    this.guitar = guitar;
    this.name = name;
  }
}

const blackFender = new Guitar("black", 3, "fender");
const personWithABlackFender = new Person(blackFender, "Nikita");
blackFender.person = personWithABlackFender;
const anotherBlackFender = blackFender.clone();

console.log(anotherBlackFender.play());
