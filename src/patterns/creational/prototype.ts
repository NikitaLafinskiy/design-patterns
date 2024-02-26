//* General implementation of the prototype pattern

interface CarPrototype {
  clone(newParams: { [key: string]: any }): CarPrototype;
  getDetails(): string;
}

class Car implements CarPrototype {
  wheels: number;
  color: string;

  constructor(wheels: number, color: string) {
    this.wheels = wheels;
    this.color = color;
  }

  clone(newParams: { [key: string]: any }): CarPrototype {
    const clonedCar = new Car(this.wheels, this.color);

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (typeof prop === "string" && Object.keys(this).includes(prop)) {
          clonedCar[prop] = this[prop];
        }
      }
    }

    return clonedCar;
  }

  public getDetails(): string {
    return `The car has ${this.wheels} wheels and it is ${this.color}`;
  }
}

const car1 = new Car(4, "red");
console.log(car1.getDetails());

const car1_clone = car1.clone({ size: { value: 10 } });
console.log(car1_clone.getDetails());

//* Implementation of prototypes in JS objects

interface ShipInterface {
  color: string;
  speed: number;
  size?: string;
  getDetails(): string;
}

const ship: ShipInterface = {
  color: "blue",
  speed: 100,

  getDetails(): string {
    return `The color is ${this.color} and the speed is ${this.speed}`;
  },
};

const ship2: ShipInterface = Object.create(ship, { size: { value: "big" } });
// console.log(ship2.getDetails());
// console.log(ship2.size);
// console.log(Object.getPrototypeOf(ship2) === ship);
