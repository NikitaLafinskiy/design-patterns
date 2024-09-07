package practice;

class DbSingleton {
    private static DbSingleton instance;

    private DbSingleton() {}

    public static DbSingleton getInstance() {
        if (instance == null) {
            instance = new DbSingleton();
        }

        return instance;
    }

    public static void main(String[] args) {
        DbSingleton dbInstance = DbSingleton.getInstance();
        DbSingleton dbInstance2 = DbSingleton.getInstance();

        System.out.println(dbInstance);
        System.out.println(dbInstance2);
    }
}