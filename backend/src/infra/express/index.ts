import "express-async-errors";
import express from "express";
import { createServer, Server } from "http";
import { errors } from "celebrate";
import cors from "cors";

import { routes } from "./routes";

export class ExpressServer {
  private _port: number;
  private _express: express.Express;
  private _server: Server;

  constructor(port: number) {
    this._port = port;
    this._express = express();
    this._server = createServer(this._express);

    this.config();
    this.handlers();
    this.handleParseErrors();
    this.handleGlobalErrors();
  }

  private config(): void {
    this._express.use(
      cors({
        origin: "*",
      })
    );
    this._express.use(express.json());
    this._express.use(express.urlencoded({ extended: true }));
  }

  private handlers(): void {
    this._express.use(routes);
  }

  private handleGlobalErrors(): void {
    this._express.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(400).json({ error: err.message });
      }
    );
  }

  private handleParseErrors(): void {
    this._express.use(
      errors({
        statusCode: 400,
      })
    );
  }

  public start(): void {
    this._server.listen(this._port);
    console.log(`SERVER RUNNING ON PORT ${this._port}`);
  }
}
