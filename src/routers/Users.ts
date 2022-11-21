import { Router } from "express";
import {usuarios} from "../controllers/Users"

const routerUser:Router = Router()

routerUser?.get('/users', usuarios.viewUsers)!
routerUser?.get('/user/:id', usuarios.user)!
routerUser?.post('/createUser', usuarios.createUser)!
routerUser?.put('/editUser/:id', usuarios.updateUser)!
routerUser?.delete('/deleteUser/:id', usuarios.deleteUser)!


export default routerUser