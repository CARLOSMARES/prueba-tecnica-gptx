"use strict";
import { Request, Response } from "express";
import { turso } from "../../config/db";
import { Usuario } from "../../interfaces/datosUsuario.interface";

// Helper function to handle errors
const handleError = (res: Response, error: unknown, message: string) => {
  if (error instanceof Error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: message });
  } else {
    console.error("An unknown error occurred:", error);
    res.status(500).json({ error: "An unknown error occurred." });
  }
};

// Get all users
export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await turso.execute({
      sql: "SELECT * FROM Usuario",
      args: [],
    });
    res.status(200).json(result.rows);
  } catch (error) {
    handleError(res, error, "An error occurred while retrieving data.");
  }
};

// Get user by ID
export const getId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await turso.execute({
      sql: "SELECT * FROM Usuario WHERE id = ?",
      args: [id],
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    handleError(res, error, "An error occurred while retrieving data.");
  }
};

// Create new user
export const create = async (req: Request, res: Response) => {
  try {
    const usuario: Usuario = req.body;

    if (
      !usuario.nombres ||
      !usuario.apellidoPaterno ||
      !usuario.apellidoMaterno ||
      !usuario.direccion ||
      !usuario.telefono
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await turso.execute({
      sql: "INSERT INTO Usuario (nombres, apellidoPaterno, apellidoMaterno, direccion, telefono) VALUES (?, ?, ?, ?, ?)",
      args: [
        usuario.nombres,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno,
        usuario.direccion,
        usuario.telefono,
      ],
    });

    res.status(201).json({ message: "User successfully created.", result });
  } catch (error) {
    handleError(res, error, "An error occurred while creating user.");
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await turso.execute({
      sql: "DELETE FROM Usuario WHERE id = ?",
      args: [id],
    });

    // Verifica si la eliminación afectó alguna fila
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    handleError(res, error, "An error occurred while deleting user.");
  }
};

// Update user
export const update = async (req: Request, res: Response) => {
  try {
    const usuario: Usuario & { id: string } = req.body;

    if (
      !usuario.id ||
      !usuario.nombres ||
      !usuario.apellidoPaterno ||
      !usuario.apellidoMaterno ||
      !usuario.direccion ||
      !usuario.telefono
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await turso.execute({
      sql: "UPDATE Usuario SET nombres = ?, apellidoPaterno = ?, apellidoMaterno = ?, direccion = ?, telefono = ? WHERE id = ?",
      args: [
        usuario.nombres,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno,
        usuario.direccion,
        usuario.telefono,
        usuario.id,
      ],
    });

    // Verifica si la actualización afectó alguna fila
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User successfully updated." });
  } catch (error) {
    handleError(res, error, "An error occurred while updating user.");
  }
};
