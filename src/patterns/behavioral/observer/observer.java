package practice;

import java.util.ArrayList;
import java.util.List;

abstract class Room {
    protected List<ChatUser> users;

    public Room(ArrayList<ChatUser> users) {
        this.users = users;
    }

    public List<ChatUser> getUsers() {
        return users;
    }
}

interface Notify {
    void notify(String message, ChatUser sentBy);
    void notifyAll(String message);
}

class ChatRoom extends Room implements Notify {
    public ChatRoom(ArrayList<ChatUser> users) {
        super(users);
    }

    public void addUser(ChatUser user) {
        users.add(user);
        user.setChatRoom(this);
    }

    @Override
    public void notify(String message, ChatUser sentBy) {
        for (ChatUser user : users) {
            if (!(user.equals(sentBy))) {
                user.update(message);
            }
        }
    }

    @Override
    public void notifyAll(String message) {
        for (ChatUser user : users) {
            user.update(message);
        }
    }
}

interface Update {
    void update(String message);
}

class ChatUser implements Update {
    private String username;
    private ChatRoom chatRoom;

    public ChatUser(String username, ChatRoom chatRoom) {
        this.username = username;
        this.chatRoom = chatRoom;
        this.chatRoom.addUser(this);
    }

    public String getUsername() {
        return username;
    }

    public void setChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    public void update(String message) {
        System.out.println("User " + username + " received a message: " + message);
    }

    public void sendMessage(String message) {
        chatRoom.notify(message, this);
    }
}

// class Main {
//     public static void main(String[] args) {
//         ChatRoom chatRoom = new ChatRoom(new ArrayList<>());
//         ChatUser user1 = new ChatUser("pussydestroyer69", chatRoom);
//         ChatUser user2 = new ChatUser("mikeoxlong", chatRoom);
//         user1.sendMessage("cock");
//     }
// }