"use strict";
import express from "express";
import http, { Server } from "http";
import { API } from "./interfaces";
import * as routes from "./routes/routes";
const cors = require("cors");

export class ExpressApi implements API {
  private router: express.Router;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.router = express.Router();

    this.router.get("/", routes.welcome);
    this.router.get("/health", routes.healthCheck);
    this.router.get("/persona/getAll", routes.getAll);
    this.router.get("/persona/getTelefono/:telefono", routes.getId);
    this.router.post("/persona/create", routes.create);
    this.router.delete("/persona/delete", routes.deleteUser);
    this.router.put("/persona/update", routes.update);
  }

  public createServer = (): Server => {
    const expressApp: express.Application = express();

    expressApp.use(express.json());
    expressApp.use(cors());

    expressApp.use("/", this.router);

    return http.createServer(expressApp);
  };
}
