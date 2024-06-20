// Context
class House {
  lightOn: ILightState;
  lightOff: ILightState;
  currState: ILightState;

  constructor() {
    this.currState = new LightOffState(this);
    this.lightOn = new LightOnState(this);
    this.lightOff = new LightOffState(this);
  }

  setState(state: ILightState) {
    this.currState = state;
  }

  turnOn() {
    this.currState.turnOn();
  }

  turnOff() {
    this.currState.turnOff();
  }
}

// State
interface ILightState {
  turnOn(): void;
  turnOff(): void;
}

class LightOnState implements ILightState {
  house: House;
  constructor(house: House) {
    this.house = house;
  }

  turnOn() {
    console.log("The lights are already on");
  }

  turnOff() {
    console.log("Turned the lights off");
    this.house.setState(this);
  }
}

class LightOffState implements ILightState {
  house: House;
  constructor(house: House) {
    this.house = house;
  }

  turnOn() {
    console.log("Turned the lights on");
    this.house.setState(this);
  }

  turnOff() {
    console.log("The lights are already off");
  }
}

// Client

let house = new House();
house.turnOn();
house.turnOff();
house.turnOff();
