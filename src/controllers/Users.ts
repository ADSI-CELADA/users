import { Request, Response } from "express";
import { conexion } from "../class/Conexion";
import bcrypt from "bcrypt";

class Usuarios {
  public async viewUsers(req: Request, res: Response): Promise<any> {
    try {
      const conectDB = await conexion.connect();
      conectDB.query("SELECT * FROM users", (error, rows) => {
        if (!error) {
          return res.status(200).json({ data: rows });
        } else {
          return res.status(500).json({ data: error });
        }
      });
    } catch (error) {
      res.status(404).json({ message: "ERROR 404" });
    }
  }

  public async user(req: Request, res: Response): Promise<any> {
    try {
      const conectDB = await conexion.connect();
      conectDB.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id],
        (error, rows) => {
          if (!error) {
            return res.status(200).json({ data: rows });
          } else {
            return res.status(400).json({ data: error });
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "ERROR 404" });
    }
  }

  public async createUser(req: Request, res: Response): Promise<any> {
    try {
      let { nombre, email, password } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const conectDB = await conexion.connect();

      conectDB.query("SELECT * FROM users", (error, rows) => {
        if (!error) {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].email == email) {
              return res.json({ message: "THE_EMAIL_IS_EXIST" });
            }
          }
        }
      });

      conectDB.query(
        "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, hash],
        (error, rows) => {
          if (rows) {
            return res.status(200).json({ data: "INSERT_USER" });
          } else {
            return res.status(500).json({ data: "INSERT_ERROR", error });
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "ERROR 404" });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    try {
      let { nombre, email, password } = req.body;
      const conectDB = await conexion.connect();
      conectDB.query(
        "UPDATE users SET nombre = ?, email = ?, password = ? WHERE id = ?",
        [nombre, email, password, req.params.id],
        (error, rows) => {
          if (!error) {
            return res.json({ data: "UPDATE_USER" });
          } else {
            return res.json({ data: "UPDATE_ERROR", error });
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "ERROR 404" });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const conectDB = await conexion.connect();
      conectDB.query(
        "DELETE FROM users WHERE id = ?",
        [req.params.id],
        (error, rows) => {
          if (rows) {
            return res.status(200).json({ data: "USER_DELETE" });
          } else {
            return res.status(400).json({ data: "USER_DELETE_ERROR" });
          }
        }
      );
    } catch (error) {
      res.status(404).json({ message: "ERROR 404" });
    }
  }
}

export const usuarios = new Usuarios();
