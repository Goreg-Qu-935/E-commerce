import express from"express";
import {Products} from '../controlers/Products/ProductControler.js'
const Route=express.Router();

Route.get('/product',Products.AllProduts)
Route.get('/product/:id',Products.SpecificProduct)

Route.post('/product',Products.Add)
Route.post('/product/:id',Products.AddProductToCatgory)

Route.put('/product/:id',Products.Update)
Route.delete('/product/:id',Products.Delete)
export default Route;