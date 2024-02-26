// interface Transport {
//   x: number;
//   y: number;

//   moveForward(x: number): { x: number; y: number };
//   moveBackwards(x: number): { x: number; y: number };
//   moveUp(y: number): { x: number; y: number };
//   moveDown(y: number): { x: number; y: number };
// }

// class AirPlane implements Transport {
//   x: number;
//   y: number;

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }

//   moveForward(x: number): { x: number; y: number } {
//     this.x = this.x + x;
//     return { x: this.x, y: this.y };
//   }

//   moveBackwards(x: number): { x: number; y: number } {
//     this.x = this.x - x;
//     return { x: this.x, y: this.y };
//   }

//   moveUp(y: number): { x: number; y: number } {
//     this.y = this.y + y;
//     return { x: this.x, y: this.y };
//   }

//   moveDown(y: number): { x: number; y: number } {
//     this.y = this.y - y;
//     return { x: this.x, y: this.y };
//   }
// }

// class Boat implements Transport {
//   x: number;
//   y: number;

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }

//   moveForward(x: number): { x: number; y: number } {
//     this.x = this.x + x;
//     return { x: this.x, y: this.y };
//   }

//   moveBackwards(x: number): { x: number; y: number } {
//     this.x = this.x - x;
//     return { x: this.x, y: this.y };
//   }

//   moveUp(y: number): { x: number; y: number } {
//     this.y = this.y + y;
//     return { x: this.x, y: this.y };
//   }

//   moveDown(y: number): { x: number; y: number } {
//     this.y = this.y - y;
//     return { x: this.x, y: this.y };
//   }
// }

// class TransportCreator {
//   transportType: string;
//   constructor(transportType: string) {
//     this.transportType = transportType;
//   }

//   createTransport(x: number, y: number): Transport {
//     switch (this.transportType) {
//       case "airplane":
//         return new AirPlane(x, y);
//       case "boat":
//         return new Boat(x, y);
//       default:
//         return new AirPlane(x, y);
//     }
//   }
// }

// const airplane_instance = new TransportCreator("airplane").createTransport(
//   0,
//   0
// );
// airplane_instance.moveForward(5);
// airplane_instance.moveDown(3);
// console.log(airplane_instance.x, airplane_instance.y);
