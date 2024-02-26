//* Simple implementation of a small class

// interface ServerInterface {
//   name: string;
//   IP: string;
// }

// class Server implements ServerInterface {
//   name: string;
//   IP: string;

//   constructor(name: string, IP: string) {
//     this.name = name;
//     this.IP = IP;
//   }

//   public getUrl(): string {
//     const URL = `http://${this.IP}/`;

//     return URL;
//   }
// }

// const AwsServer = new Server("Eu-central 1", "143.42.35.52");
// console.log(AwsServer.getUrl());

//* Implementation of the Builder pattern

interface ServerInterface {
  getName(): string;
  getIp(): string;
  getOwner(): string;
}

class Server implements ServerInterface {
  private name: string;
  private ip: string;
  private owner: string;

  constructor(name: string, ip: string, owner: string) {
    this.name = name;
    this.ip = ip;
    this.owner = owner;
  }

  public getName(): string {
    return this.name;
  }

  public getIp(): string {
    return this.ip;
  }

  public getOwner(): string {
    return this.owner;
  }
}

interface ServerBuilderInterface {
  setName(name: string): void;
  setIp(ip: string): void;
  setOwner(owner: string): void;
  build(): ServerInterface;
}

class ServerBuilder implements ServerBuilderInterface {
  private name: string = "Default name";
  private ip: string = "0.0.0.0";
  private owner: string = "Default owner";

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setIp(ip: string) {
    this.ip = ip;
    return this;
  }

  public setOwner(owner: string) {
    this.owner = owner;
    return this;
  }

  public build() {
    return new Server(this.name, this.ip, this.owner);
  }
}

const builder = new ServerBuilder();
const aws = builder
  .setName("Eu-central 1")
  .setIp("143.65.62.65")
  .setOwner("AccountUser1")
  .build();

console.log(aws.getName());
