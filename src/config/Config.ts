import dotenv from "dotenv"

dotenv.config()

export const PORT: any = process.env["PORT"];
export const HOST: any  = process.env["DB_HOST"];
export const USER: any  = process.env["DB_USER"];
export const PASSWORD: any  = process.env["DB_PASSWORD"];
export const DATABASE: any = process.env["DB_DATABASE"];
export const PORTDB: any = process.env["DB_PORT"];
export const CHARSET: any = process.env["DB_CHARSET"];