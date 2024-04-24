// Products and Concrete Products
interface Transport {
  x: number;
  y: number;
  moveForward(x: number): void;
  moveBackwards(x: number): void;
  moveUp(y: number): void;
  moveDown(y: number): void;
}

class AirTransport implements Transport {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveForward(x: number): void {
    this.x += x;
  }

  moveBackwards(x: number): void {
    this.x -= x;
  }

  moveUp(y: number): void {
    this.y += y;
  }

  moveDown(y: number): void {
    this.y -= y;
  }
}

class LandTransport implements Transport {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveForward(x: number): void {
    this.x += x;
  }

  moveBackwards(x: number): void {
    this.x -= x;
  }

  moveUp(y: number): void {
    this.y += y;
  }

  moveDown(y: number): void {
    this.y -= y;
  }
}

class WaterTransport implements Transport {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveForward(x: number): void {
    this.x += x;
  }

  moveBackwards(x: number): void {
    this.x -= x;
  }

  moveUp(y: number): void {
    this.y += y;
  }

  moveDown(y: number): void {
    this.y -= y;
  }
}

// Creator and Concrete Creators
abstract class TransportCreator {
  protected transportInstance: Transport;

  constructor(x: number, y: number) {
    this.transportInstance = this.createTransport(x, y);
  }

  protected abstract createTransport(x: number, y: number): Transport;

  moveForward(x: number): string {
    this.transportInstance.moveForward(x);
    return `Current position x: ${this.transportInstance.x}, y: ${this.transportInstance.y}`;
  }

  moveBackwards(x: number): string {
    this.transportInstance.moveBackwards(x);
    return `Current position x: ${this.transportInstance.x}, y: ${this.transportInstance.y}`;
  }

  moveUp(y: number): string {
    this.transportInstance.moveUp(y);
    return `Current position x: ${this.transportInstance.x}, y: ${this.transportInstance.y}`;
  }

  moveDown(y: number): string {
    this.transportInstance.moveDown(y);
    return `Current position x: ${this.transportInstance.x}, y: ${this.transportInstance.y}`;
  }
}

class AirTransportCreator extends TransportCreator {
  protected createTransport(x: number, y: number): Transport {
    return new AirTransport(x, y);
  }
}

class WaterTransportCreator extends TransportCreator {
  protected createTransport(x: number, y: number): Transport {
    return new WaterTransport(x, y);
  }
}

class LandTransportCreator extends TransportCreator {
  protected createTransport(x: number, y: number): Transport {
    return new LandTransport(x, y);
  }
}

const car = new LandTransportCreator(0, 0);
console.log(car.moveBackwards(10));
console.log(car.moveBackwards(10));
