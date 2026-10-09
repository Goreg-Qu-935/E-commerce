import express  from "express";

import {Users} from "../controlers/Users/UserControler.js"

const Route=express.Router()

Route.get("/login", Users.LogIn)
Route.post("/regester",Users.Regester)
Route.get("/users",Users.GetAll)
Route.get("/users/:id",Users.SpecificUser)
Route.put("/users/:id",Users.Update)
Route.delete("/users/:id",Users.Delete)
export default Route