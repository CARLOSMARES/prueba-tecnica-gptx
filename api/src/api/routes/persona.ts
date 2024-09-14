"use strict";
import { Request, Response } from "express";
import { turso } from "../../config/db";
export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await turso.execute({
      sql: "select * from Usuario",
      args: {},
    });
    res.status(200).json({
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data." });
  }
};
export const getId = async (req: Request, res: Response) => {
  try {
    const result = await turso.execute({
      sql: "select * from Usuario where Name = ?",
      args: req.body.name,
    });
    res.status(200).json({
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};
