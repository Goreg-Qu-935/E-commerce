import express from "express";
import { CatgoryModule } from "../modules/Catgory.js";
import { Auth } from "../MiddelWare/Auth.js";


const Route = express.Router();

Route.get("/catgory",Auth.Authnitcaion,CatgoryModule.GetAllCatgorys);

Route.get("/catgory/:id",Auth.Authnitcaion,CatgoryModule.GetSpsifecCatgorys);

Route.post("/catgory",Auth.Authnitcaion,Auth.Authrization,CatgoryModule.CreatCatgory);

Route.put("/catgory/:id",Auth.Authnitcaion,Auth.Authrization,CatgoryModule.updateCatgory);

Route.delete("/catgory/:id",Auth.Authnitcaion,Auth.Authrization,CatgoryModule.DeleteCategory);

Route.post("/catgory/:CatgoryId/product/:ProductId",Auth.Authrization,Auth.Authnitcaion,CatgoryModule.addProductToCatogry);

Route.delete("/catgory/product/:ProductId",Auth.Authnitcaion,Auth.Authrization,CatgoryModule.DeleteProductFromCatgory);

export default Route;