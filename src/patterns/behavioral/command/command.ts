// invoker (set, call)
interface ILightInvoker {
  setCommand(command: ILightSwitch): void;
  callCommand(): string;
}

class LightInvoker implements ILightInvoker {
  command: ILightSwitch | null;

  constructor(command?: ILightSwitch) {
    this.command = command ? command : null;
  }

  setCommand(command: ILightSwitch): void {
    this.command = command;
  }

  callCommand(): string {
    return this.command?.execute()!;
  }
}

// command interface (methods)
interface ILightSwitch {
  execute(): string;
}
// concrete command (called by the invoker, delegate tasks to the receiver)
class LightOn implements ILightSwitch {
  receiver: LightReceiver;

  constructor(receiver: LightReceiver) {
    this.receiver = receiver;
  }

  execute(): string {
    return this.receiver.turnOn();
  }
}

class LightOff implements ILightSwitch {
  receiver: LightReceiver;

  constructor(receiver: LightReceiver) {
    this.receiver = receiver;
  }

  execute(): string {
    return this.receiver.turnOff();
  }
}

// receiver (final execution)
interface ILightReceiver {
  turnOn(): string;
  turnOff(): string;
}

class LightReceiver {
  state: boolean;

  constructor(state: boolean) {
    this.state = state;
  }

  turnOn(): string {
    if (this.state) {
      return "the light bulb is already turned on";
    }

    this.state = true;
    return "turned on the light bulb";
  }

  turnOff(): string {
    if (!this.state) {
      return "the light bulb is already turned off";
    }

    this.state = false;
    return "turned off the light bult";
  }
}

const lightInvoker = new LightInvoker();
lightInvoker.setCommand(new LightOn(new LightReceiver(false)));
console.log(lightInvoker.callCommand());
