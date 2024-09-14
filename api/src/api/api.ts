"use strict";
import express from "express";
import http, { Server } from "http";
import { API } from "./interfaces";
import * as routes from "./routes/routes";

export class ExpressApi implements API {
  private router: express.Router;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.router = express.Router();

    this.router.get("/", routes.welcome);
    this.router.get("/health", routes.healthCheck);
    this.router.get("/persona/getAll", routes.getAll);
    this.router.get("/persona/getName/:name", routes.getId);
    this.router.post("/peronsa/creatre", routes.Create);
    this.router.delete("/persona/delete", routes.Delete);
    this.router.put("/persona/update", routes.Update);
  }

  public createServer = (): Server => {
    const expressApp: express.Application = express();

    expressApp.use("/", this.router);

    return http.createServer(expressApp);
  };
}
