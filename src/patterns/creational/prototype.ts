//* General implementation of the prototype pattern (not type safe, it is safer to define the properties right away manually)

interface CarPrototype {
  clone(newParams: { [key: string]: any }): CarPrototype;
  getDetails(): string;
}

class Car implements CarPrototype {
  wheels: number;
  color: string;
  [key: string]: any;

  constructor(wheels: number, color: string) {
    this.wheels = wheels;
    this.color = color;
  }

  clone(newParams: { [key: string]: any }): CarPrototype {
    const clonedCar = new Car(this.wheels, this.color);

    for (const prop in newParams) {
      clonedCar[prop] = newParams[prop];
    }

    return clonedCar;
  }

  public getDetails(): string {
    const properties = Object.keys(this);

    let otherProperties = [];

    for (let i = 0; i < properties.length; i++) {
      if (properties[i] !== "wheels" && properties[i] !== "color") {
        otherProperties.push(properties[i]);
      }
    }

    let otherValues = "";

    for (let i = 0; i < otherProperties.length; i++) {
      otherValues = `${otherValues} ${otherProperties[i]}: ${
        this[otherProperties[i]].value
      }`;
    }

    return `The car has ${this.wheels} wheels and it is ${this.color}. Other properties: ${otherValues}`;
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
console.log(ship2.getDetails());
console.log(ship2.size);
console.log(Object.getPrototypeOf(ship2) === ship);
