import express, { json, Application } from "express";
import routerUser from "./routers/Users";


const app: Application = express();
app.use(json())

// Routers ->
app.use(routerUser)



export default app