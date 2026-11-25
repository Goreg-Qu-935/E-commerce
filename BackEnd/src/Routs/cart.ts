import express from "express";
import { CartControllers } from "../controlers/Cart.js";
import { Auth } from "../MiddelWare/Auth.js";

const Route = express.Router();


Route.get("/cart",Auth.Authnitcaion,CartControllers.GetCart);
Route.post("/cart",Auth.Authnitcaion,CartControllers.CreateCart);
Route.post("/cart/add",Auth.Authnitcaion,CartControllers.AddToCart);
Route.put("/cart/:ProductId",Auth.Authnitcaion,CartControllers.UpdateCartItem);
Route.delete("/cart/:ProductId",Auth.Authnitcaion,CartControllers.RemoveFromCart);
Route.delete("/cart",Auth.Authnitcaion,CartControllers.ClearCart);
Route.post("/cart/buy",Auth.Authnitcaion,CartControllers.BuyCart);


export default Route;