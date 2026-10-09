import type { Request, Response } from "express";
import { CatgoryModule } from "../../module/Catgory.js";
export const Catgories = {
    
    GetAll(req: Request, res: Response) {
        CatgoryModule.GetAllCatgory.then((arr) => {
            const [rows] = arr
            res.send(rows)
        })
    },
    getCatgoryWithProducts(req: Request, res: Response) {
      CatgoryModule.GetCatgoryWithProducts(req.params.id).then(([rows]) => {
            console.log(rows)
        })
    },
    Add(req: Request, res: Response) {
        if (req.body.CatgoryName != undefined)
                CatgoryModule.AddCatgory(req.body.CatgoryName).then(() => {
                    console.log("Done Adding new Categories")
                    res.status(200).json({ message: "Done Adding New Categories" })
                })
        else
            res.status(500).json({ error: "Cant add null Categories" })
    },

    Delete(req: Request, res: Response) {
            CatgoryModule.DeleteCatgory(req.params.id).then(() => {
                res.status(200).json({ message: "done Delting Categories" })
                console.log("Done Deleting Categories")
            }).catch(() => {
                res.status(500).json({ error: "Cant Delting Categories" })
            })
    },

    Update(req: Request, res: Response) {
        CatgoryModule.UpdateCatgory(req.body.CatgoryName,req.params.id).then(() => {
          console.log(req.body.CatgoryName)
            res.status(200).json({ message: "done Delting Categories" })
            console.log("Done Deleting Categories")
        }).catch(() => {
            res.status(500).json({ error: "Cant Delting Categories" })
        })
    },
}