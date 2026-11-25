import express  from "express";

import {Users} from "../controlers/UserControler.js"
import rateLimit from "express-rate-limit";
import { Auth } from "../MiddelWare/Auth.js";
const rate = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit:15
})

const Route=express.Router()

Route.post("/login",rate, Users.LogIn)
Route.post("/regester",rate,Users.Regester)
Route.get("/users",Users.GetAll)
Route.get("/auth/google",Users.GoogleAuth)

Route.get("/auth/google/success",Auth.Authnitcaion,Auth.Authrization,Users.GoogleAuthSuccess)
Route.get("/users/:id",Auth.Authnitcaion,Auth.Authrization,Users.SpecificUser)
Route.put("/users/:id",Auth.Authnitcaion,Auth.Authrization,Users.Update)
Route.delete("/users/:id",Auth.Authnitcaion,Auth.Authrization,Users.Delete)
export default Route