"use strict";
import { Request, Response } from "express";
export const healthCheck = (_req: Request, res: Response): Response => {
  return res.json({ status: "OK" });
};
