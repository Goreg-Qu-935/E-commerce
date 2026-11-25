import type { Request, Response } from "express";
import { ProductValidation } from "../MiddelWare/zod.js";
import { ProductModule } from '../module/ProductModule.js'
export const Products = {
    Add(req: Request, res: Response) {
        try {
            const { ProductName, ProductDescribtion, Productprice, ProductQunantaty } = req.body;
            const result: any = ProductValidation.safeParse({ ProductName, ProductDescribtion, Productprice, ProductQunantaty })
            if (!result.success) {
                const errorMessage = JSON.parse(result.error)
                return res.status(400).json({ error: errorMessage[0].message })
            }
            ProductModule.CreateProduct(ProductName, ProductDescribtion, Productprice,ProductQunantaty).then(() => {
                res.status(200).json({ message: "Done adding product" })
            }).catch(() => { res.status(500).json({ Error: "Can't Create New Product" }) })
        } catch {
            res.status(500).json({ Error: "Please Enter Values For Product " })
        }

    },
    
    AllProduts(req: Request, res: Response) {
        ProductModule.GetAllProducts().then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            console.log("Can't Get The products")
        })
    },

    SpecificProduct(req: Request, res: Response) {
        ProductModule.GetSpesficProduct(req.params.id).then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            console.log("Can't Get The products")
        })
    },

    Update(req: Request, res: Response) {
        try {
            const { ProductName, ProductDescribtion, Productprice, ProductQunantaty } = req.body;
            const result: any = ProductValidation.safeParse({ ProductName, ProductDescribtion, Productprice, ProductQunantaty })
            if (!result.success) {
                const errorMessage = JSON.parse(result.error)
                return res.status(400).json({ error: errorMessage[0].message })
            } ProductModule.UpdateProduct( req.params.id,ProductName, ProductDescribtion, Productprice, ProductQunantaty).then(() => {
                res.status(200).json({ message: "Done Updating The Product" })
            }).catch(() => {
                res.status(500).json({ message: "Can't Update The Product" })
            })
        } catch {
            res.status(500).json({ message: "Please Enter Values For Updating The Product" })
        }
    },

    Delete(req: Request, res: Response) {
        ProductModule.DeleteProduct(req.params.id).then(() => {
            res.status(200).json({ message: "Done Deleting Product" })
        }).catch(() => {
            res.status(500).json({ message: "Cant Deleting Product" })
        })
    },
}