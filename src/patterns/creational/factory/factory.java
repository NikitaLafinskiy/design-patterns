package practice;

import java.util.HashMap;
import java.util.Map;

// Components
interface Vehicle {
    void moveForward(int x);
}

class Truck implements Vehicle {
    private String color;
    private int x;

    public Truck(int x, String color) {
        this.color = color;
        this.x = x;
    }

    public String getColor() {
        return color;
    }

    public int getX() {
        return x;
    }

    public void moveForward(int x) {
        this.x += x;
    }
}

class Airplane implements Vehicle {
    private String color;
    private int x;

    public Airplane(int x, String color) {
        this.color = color;
        this.x = x;
    }

    public String getColor() {
        return color;
    }

    public int getX() {
        return x;
    }

    public void moveForward(int x) {
        this.x += x;
    }
}

// Factory
class VehicleFactory {
    public static Vehicle createVehicle(VEHICLE_TYPE type, int x, String color) {

        switch (type) {
            case AIRPLANE:
                return new Airplane(x, color);
            case TRUCK:
                return new Truck(x, color);
            default:
                return new Truck(x, color);
        }
    }
}

// Vehicle Types
enum VEHICLE_TYPE {
    TRUCK,
    AIRPLANE
}

// class Main {
//     public static void main(String[] args) {
//         Truck truck = (Truck) VehicleFactory.createVehicle(VEHICLE_TYPE.TRUCK, 10, "black");
//         truck.moveForward(5);
//         System.out.println(truck.getX());
//     }
// }