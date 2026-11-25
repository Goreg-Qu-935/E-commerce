import type { Request, Response } from "express";

import { CatgoryModule } from '../module/CatgoryModule.js';
export const Catgories = {

    GetAll(req: Request, res: Response) {
        CatgoryModule.GetAllCatgorys().then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(500).json({ Error: "Can't Get The Catgories" })
        })
    },
    Add(req: Request, res: Response) {
        if (req.body.CatgoryName == undefined) { res.status(500).json({ error: "Cant add null Categories" }) }
        CatgoryModule.CreatCatgory(req.body.CatgoryName).then(() => {
            console.log("Done Adding new Categories")
            res.status(200).json({ message: "Done Adding New Categories" })
        })
    },

    Delete(req: Request, res: Response) {
        CatgoryModule.DeleteCategory(req.params.id).then(() => {
            res.status(200).json({ message: "done Delting Categories" })
            console.log("Done Deleting Categories")
        }).catch(() => {
            res.status(500).json({ error: "Cant Delting Categories" })
        })
    },

    Update(req: Request, res: Response) {
        CatgoryModule.updateCatgory(req.params.id,req.body.CatgoryName).then(() => {
            console.log(req.body.CatgoryName)
            res.status(200).json({ message: "Done Updating Categories" })
            console.log("Done Deleting Categories")
        }).catch(() => {
            res.status(500).json({ error: "Cant Updating Categories" })
        })
    },
    AddProductToCatgory(req:Request,res:Response){
        const ProductId = req.body.ProductId
        const CatgoryId= req.params.CatgoryId 
        CatgoryModule.addProductToCatogry(CatgoryId,ProductId).then(()=>{
            res.status(200).json({Message:"Done Adding The Product To The Catgory"})
        }).catch(()=>{
            res.status(500).json({Message:"Can't Adding The Product To The Catgory"})
        })
    },
DeleteProductToCatgory(req:Request,res:Response){
        const ProductId = req.body.ProductId
        CatgoryModule.DeleteProductFromCatgory(ProductId).then(()=>{
            res.status(200).json({Message:"Done Deleting The Product To The Catgory"})
        }).catch(()=>{
            res.status(500).json({Message:"Can't Deleting The Product To The Catgory"})
        })
    }

}