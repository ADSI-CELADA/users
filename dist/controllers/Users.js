"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const Conexion_1 = require("../class/Conexion");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Usuarios {
    viewUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conectDB = yield Conexion_1.conexion.connect();
                conectDB.query("SELECT * FROM users", (error, rows) => {
                    if (!error) {
                        return res.status(200).json({ data: rows });
                    }
                    else {
                        return res.status(500).json({ data: error });
                    }
                });
            }
            catch (error) {
                res.status(404).json({ message: "ERROR 404" });
            }
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conectDB = yield Conexion_1.conexion.connect();
                conectDB.query("SELECT * FROM users WHERE id = ?", [req.params.id], (error, rows) => {
                    if (!error) {
                        return res.status(200).json({ data: rows });
                    }
                    else {
                        return res.status(400).json({ data: error });
                    }
                });
            }
            catch (error) {
                res.status(404).json({ message: "ERROR 404" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre, email, password } = req.body;
                const saltRounds = 10;
                const salt = bcrypt_1.default.genSaltSync(saltRounds);
                const hash = bcrypt_1.default.hashSync(password, salt);
                const conectDB = yield Conexion_1.conexion.connect();
                conectDB.query("SELECT * FROM users", (error, rows) => {
                    if (!error) {
                        for (let i = 0; i < rows.length; i++) {
                            if (rows[i].email == email) {
                                return res.json({ message: "THE_EMAIL_IS_EXIST" });
                            }
                        }
                    }
                });
                conectDB.query("INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hash], (error, rows) => {
                    if (rows) {
                        return res.status(200).json({ data: "INSERT_USER" });
                    }
                    else {
                        return res.status(500).json({ data: "INSERT_ERROR", error });
                    }
                });
            }
            catch (error) {
                res.status(404).json({ message: "ERROR 404" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre, email, password } = req.body;
                const conectDB = yield Conexion_1.conexion.connect();
                conectDB.query("UPDATE users SET nombre = ?, email = ?, password = ? WHERE id = ?", [nombre, email, password, req.params.id], (error, rows) => {
                    if (!error) {
                        return res.json({ data: "UPDATE_USER" });
                    }
                    else {
                        return res.json({ data: "UPDATE_ERROR", error });
                    }
                });
            }
            catch (error) {
                res.status(404).json({ message: "ERROR 404" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conectDB = yield Conexion_1.conexion.connect();
                conectDB.query("DELETE FROM users WHERE id = ?", [req.params.id], (error, rows) => {
                    if (rows) {
                        return res.status(200).json({ data: "USER_DELETE" });
                    }
                    else {
                        return res.status(400).json({ data: "USER_DELETE_ERROR" });
                    }
                });
            }
            catch (error) {
                res.status(404).json({ message: "ERROR 404" });
            }
        });
    }
}
exports.usuarios = new Usuarios();
