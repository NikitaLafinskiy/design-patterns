class RequestClass {
  isAuthenticated: boolean;
  isValid: boolean;
  isBanned: boolean;

  constructor({
    isAuthenticated,
    isValid,
    isBanned,
  }: {
    isAuthenticated: boolean;
    isValid: boolean;
    isBanned: boolean;
  }) {
    this.isAuthenticated = isAuthenticated;
    this.isValid = isValid;
    this.isBanned = isBanned;
  }
}

// Handler

interface IRequestHandler {
  setNext(handler: IRequestHandler): IRequestHandler;
  handle(options: RequestClass): string | null;
}

// BaseHandler

abstract class BaseRequestHandler implements IRequestHandler {
  next: IRequestHandler | null = null;

  setNext(handler: IRequestHandler): IRequestHandler {
    this.next = handler;
    return this.next;
  }

  handle(options: RequestClass): string | null {
    if (this.next) {
      this.next.handle(options);
    }

    return null;
  }
}

// ConcreteHandlers

class AuthenticationHandler extends BaseRequestHandler {
  handle(options: RequestClass): string | null {
    if (options.isAuthenticated && this.next !== null) {
      return this.next.handle(options);
    }

    return "User not authenticated";
  }
}

class ValidationHandler extends BaseRequestHandler {
  handle(options: RequestClass): string | null {
    if (options.isValid && this.next !== null) {
      return this.next.handle(options);
    }

    return "Request is not valid";
  }
}

class BanHandler extends BaseRequestHandler {
  handle(options: RequestClass): string | null {
    if (!options.isBanned && this.next !== null) {
      return this.next.handle(options);
    }

    return "User is banned";
  }
}

class RouteHandler extends BaseRequestHandler {
  handle(options: RequestClass): string | null {
    return "User authenticated";
  }
}

const user1Options = new RequestClass({
  isBanned: false,
  isValid: true,
  isAuthenticated: true,
});

const banHandler = new BanHandler();
const validationHandler = new ValidationHandler();
const authHandler = new AuthenticationHandler();
const routeHandler = new RouteHandler();

banHandler
  .setNext(validationHandler)
  .setNext(authHandler)
  .setNext(routeHandler);

console.log(banHandler.handle(user1Options));
