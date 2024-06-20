// Publisher
class ChatRoom {
  users: IUser[] = [];
  messages: string[] = [];
  constructor(users: IUser[], messages?: string[]) {
    this.users = users;
    this.messages = messages ? messages : [];
    for (let i = 0; i < users.length; i++) {
      this.users[i].setChatRoom(this);
    }
  }

  addUser(user: IUser): void {
    if (!this.users.includes(user)) {
      this.users.push(user);
      user.setChatRoom(this);
    }
  }

  removeUser(user: IUser): void {
    if (this.users.includes(user)) {
      this.users = this.users.filter((u) => u !== user);
    }
  }

  notifyUsers(message: string, sentBy: IUser) {
    this.messages.push(message);
    const usersToNotify = this.users.filter((u) => u !== sentBy);
    for (let i = 0; i < usersToNotify.length; i++) {
      usersToNotify[i].update(message);
    }
  }
}

// Subscribers
interface IUser {
  sendMessage(message: string): void;
  update(message: string): void;
  setChatRoom(chatRoom: ChatRoom): void;
}

class User implements IUser {
  chatRoom: ChatRoom | null;
  name: string;
  age: number;
  constructor(name: string, age: number, chatRoom?: ChatRoom) {
    this.chatRoom = chatRoom ? chatRoom : null;
    this.name = name;
    this.age = age;
  }

  setChatRoom(chatRoom: ChatRoom) {
    this.chatRoom = chatRoom;
  }

  sendMessage(message: string): void {
    this.chatRoom?.notifyUsers(message, this);
  }

  update(message: string): void {
    console.log("Message received by user " + this.name + ": " + message);
  }
}

const user1 = new User("Nikita", 20);
const user2 = new User("Olya", 20);
const user3 = new User("Sasha", 10);
const user4 = new User("Bebra", 3);

const chatRoom = new ChatRoom([user1, user2, user3]);

chatRoom.addUser(user4);

user1.sendMessage("hey");
console.log(chatRoom.messages);
