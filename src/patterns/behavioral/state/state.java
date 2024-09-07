package practice;

// Context
interface ChangeState {
    void changeState(State state);
}

class Vim implements ChangeState, State{
    public State visualState;
    public State insertState;
    public State defaultState;
    public State commandState;
    private State currentState;

    public Vim() {
        defaultState = new DefaultState(this);
        visualState = new VisualState(this);
        insertState = new InsertState(this);
        commandState = new CommandState(this);
        currentState = defaultState;
    }

    public void changeState(State state) {
        currentState = state;
    }

    public void visualState() {
        currentState.visualState();
    }

    public void defaultState() {
        currentState.defaultState();
    }

    public void commandState() {
        currentState.commandState();
    }

    public void insertState() {
        currentState.insertState();
    }

    public void type() {
        currentState.type();
    }
}

// States
interface State {
    void visualState();
    void defaultState();
    void commandState();
    void insertState();
    void type();
}

abstract class BaseState implements State {
    protected Vim ctx;
    
    public BaseState(Vim ctx) {
        this.ctx = ctx;
    }

    public void visualState() {
        System.out.println("Switching to the visual state");
        ctx.changeState(ctx.visualState);
    }

    public void defaultState() {
        System.out.println("Switching to the default state");
        ctx.changeState(ctx.defaultState);
    }

    public void commandState() {
        System.out.println("Switching to the command state");
        ctx.changeState(ctx.commandState);
    }

    public void insertState() {
        System.out.println("Switching to the insert state");
        ctx.changeState(ctx.insertState);
    }

    public void type() {
        System.out.println("Unable to type in the current state");
    }
}

class InsertState extends BaseState {
    public InsertState(Vim ctx) { super(ctx); }

    public void insertState() {
        System.out.println("Already in the insert state");
    }

    public void type() {
        System.out.println("Typing...");
    }
}

class DefaultState extends BaseState {
    public DefaultState(Vim ctx) { super(ctx); }

    public void defaultState() {
        System.out.println("Already in the default state");
    }
}

class VisualState extends BaseState {
    public VisualState(Vim ctx) { super(ctx); }

    public void visualState() {
        System.out.println("Already in the default state");
    }
}

class CommandState extends BaseState {
    public CommandState(Vim ctx) { super(ctx); }

    public void commandState() {
        System.out.println("Already in the command state");
    }
}

// class Main {
//     public static void main(String[] args) {
//         Vim vim = new Vim();
//         vim.insertState();
//         vim.type();
//         vim.defaultState();
//         vim.defaultState();
//     }
// }