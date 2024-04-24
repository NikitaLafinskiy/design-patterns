import express, { Request, Response } from "express";

interface IHttpFacade {
  getAndListen(): void;
}

class HttpFacade implements IHttpFacade {
  app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  getAndListen() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello");
    });

    this.app.listen(6969, () => {
      console.log("Listening on port 6969");
    });
  }
}

const server = new HttpFacade(express());
server.getAndListen();
