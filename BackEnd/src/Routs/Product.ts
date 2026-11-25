import express from"express";
import {Products} from '../controlers/ProductControler.js'
import multer from "multer"
import { Auth } from "../MiddelWare/Auth.js";
const Route=express.Router();

const Upload = multer ({Storage:multer.memoryStorage()})

Route.get('/product',Products.AllProduts)
Route.get('/product/:id',Auth.Authnitcaion,Products.SpecificProduct)

Route.post('/product',Auth.Authnitcaion,Auth.Authrization,Upload.single("Image"),Products.Add)

Route.put('/product/:id',Auth.Authnitcaion,Auth.Authrization,Products.Update)
Route.delete('/product/:id',Auth.Authnitcaion,Auth.Authrization,Products.Delete)
export default Route;