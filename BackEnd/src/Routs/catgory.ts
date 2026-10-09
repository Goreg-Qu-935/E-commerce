import express from "express";
import { Catgories } from "../controlers/Catgory/Catgories.js";
const Route = express.Router();


Route.get("/catgory", Catgories.GetAll)
Route.get("/catgory/:id", Catgories.getCatgoryWithProducts)
Route.delete("/catgory/:id", Catgories.Delete)
Route.put("/catgory/:id", Catgories.Update)
Route.post("/catgory", Catgories.Add)

export default Route