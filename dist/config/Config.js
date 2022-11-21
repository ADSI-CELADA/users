"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHARSET = exports.PORTDB = exports.DATABASE = exports.PASSWORD = exports.USER = exports.HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env["PORT"];
exports.HOST = process.env["DB_HOST"];
exports.USER = process.env["DB_USER"];
exports.PASSWORD = process.env["DB_PASSWORD"];
exports.DATABASE = process.env["DB_DATABASE"];
exports.PORTDB = process.env["DB_PORT"];
exports.CHARSET = process.env["DB_CHARSET"];
