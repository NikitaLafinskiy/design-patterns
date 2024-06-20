// Invoker
class Player {
  movementCommand: IMovementCommand;
  constructor(movementCommand: IMovementCommand) {
    this.movementCommand = movementCommand;
  }

  Move(): PlayerLocation {
    return this.movementCommand.execute();
  }
}

// Command Interface
interface IMovementCommand {
  execute(): PlayerLocation;
}

// Concrete Commands
class PlayerLocation {
  x = 0;
  y = 0;
  z = 0;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class MoveCommand implements IMovementCommand {
  location: PlayerLocation;
  movementReceiver: MovementReceiver;
  x: number = 0;
  z: number = 0;

  constructor(
    location: PlayerLocation,
    movementReceiver: MovementReceiver,
    x: number,
    z: number
  ) {
    this.location = location;
    this.movementReceiver = movementReceiver;
    this.x = x;
    this.z = z;
  }

  execute(): PlayerLocation {
    return this.movementReceiver.movePlayer(this.location, this.x, this.z);
  }
}

class JumpCommand implements IMovementCommand {
  location: PlayerLocation;
  movementReceiver: MovementReceiver;
  y: number = 0;

  constructor(
    location: PlayerLocation,
    movementReceiver: MovementReceiver,
    y: number
  ) {
    this.location = location;
    this.movementReceiver = movementReceiver;
    this.y = y;
  }

  execute(): PlayerLocation {
    return this.movementReceiver.jumpPlayer(this.location, this.y);
  }
}

// Receivers
class MovementReceiver {
  movePlayer(location: PlayerLocation, x: number, z: number): PlayerLocation {
    location.x += x;
    location.z += z;
    return location;
  }

  jumpPlayer(location: PlayerLocation, y: number): PlayerLocation {
    location.y += y;
    return location;
  }
}

// Client
let currentLocation = new PlayerLocation(0, 0, 0);
let movementReceiver = new MovementReceiver();
let jumpCommand = new JumpCommand(currentLocation, movementReceiver, 1);

let player = new Player(jumpCommand);
console.log(player.Move());
console.log(currentLocation);
