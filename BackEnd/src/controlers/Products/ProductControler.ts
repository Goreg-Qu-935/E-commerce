import type { Request, Response } from "express";
import db from "../../module/db.js";
import { ProductValidation } from "../../module/zod.js";
import { ProductModule } from "../../module/ProductModule.js";

export const Products = {

    AllProduts(req: Request, res: Response) {
        ProductModule.GetAllProducts.then((arr) => {
            const [rows] = arr
            res.send(rows)
            console.log(rows)
        }).catch(() => {
            console.log("There is rror on products")
        })
    },

    SpecificProduct(req: Request, res: Response) {
        ProductModule.SpecificProduct(req.params.id).then((arr) => {
            const [rows] = arr
            res.send(rows)
        })
    },

    Update(req: Request, res: Response) {
        const { ProductName, ProductDescribtion, Productprice, ProductQunantaty } = req.body;
        const result = ProductValidation.safeParse({ ProductName, ProductDescribtion, Productprice, ProductQunantaty })
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        } ProductModule.UpdateProduct(ProductName, ProductDescribtion, Productprice, ProductQunantaty, req.params.id).then(() => {
            res.status(200).json({ message: "Done Updating The Product" })
        }).catch(() => {
            res.status(500).json({ message: "Done Updating The Product" })
        })

    },

    Add(req: Request, res: Response) {
        const { ProductName, ProductDescribtion, Productprice, ProductQunantaty } = req.body;
        const result = ProductValidation.safeParse({ ProductName, ProductDescribtion, Productprice, ProductQunantaty })
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        }
        ProductModule.AddProduct(ProductName, ProductDescribtion, Productprice, ProductQunantaty).then(() => {
            res.status(200).json({ message: "Done adding product" })
            console.log("Done Adding The Product");
        })

    },

    Delete(req: Request, res: Response) {
        ProductModule.DeleteProduct(req.params.id).then(() => {
            res.status(200).json({ message: "Done Deleting Product" })
        }).catch(() => {
            res.status(500).json({ message: "Cant Deleting Product" })
        })
    },
  AddProductToCatgory(req: Request, res: Response) {
        db.query("  insert into ProductsCategories (ProductId,CategoryId) values(?,?) ", [req.params.id, req.body.CategoryId]).then(()=>{
            console.log("Done Inserting")
            res.send("Done Adding")
        })
    }
}