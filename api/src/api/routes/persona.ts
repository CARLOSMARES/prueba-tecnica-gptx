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

export const Create = async (req: Request, res: Response) => {
  try {
    const { name, apellidopaterno, apellidomaterno, direccion, telefono } =
      req.body;
    const result = await turso.execute({
      sql: "insert into Usuario values (?)",
      args: {
        name,
        apellidopaterno,
        apellidomaterno,
        direccion,
        telefono,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured with register new person" });
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const result = await turso.execute({
      sql: "delete from Usuario where id = ?",
      args: { id },
    });
    res.status(200).json({
      result: result,
      message: "Delete register",
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred with delete register" });
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id, name, apellidopaterno, apellidomaterno, direccion, telefono } =
      req.body;

    const result = await turso.execute({
      sql: "update Usuario where id = ? values (?)",
      args: {
        id,
        name,
        apellidopaterno,
        apellidomaterno,
        direccion,
        telefono,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error ocurred with update register" });
  }
};
