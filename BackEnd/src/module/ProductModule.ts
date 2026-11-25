import { PrismaClient } from "../generated/prisma/client.js";
const Prisma = new PrismaClient()
export const ProductModule = {
    async CreateProduct(Product_Name: string, Product_Desc: string, Product_Qunatati: number, Product_Price: number) {
        await Prisma.products.create({
            data: {
                ProductName: Product_Name,
                ProductDesc: Product_Desc,
                ProductQunatati: Product_Qunatati,
                ProductPrice: Product_Price
            }
        })
    },
    async GetAllProducts() {
        return await Prisma.products.findMany()
    },
    async GetSpesficProduct(Product_Id: string) {
        const data = await Prisma.products.findFirst({
            where: {
                ProductId: Product_Id
            }
        })
        return data
    },
    async DeleteProduct(Product_Id: string) {
        await Prisma.products.delete({ where: { ProductId: Product_Id } })
    },
    async UpdateProduct(Product_Id: string, Product_Name: string, Product_Desc: string, Product_Qunatati: number, Product_Price: number) {
        await Prisma.products.update({
            where: {
                ProductId: Product_Id
            }, data: {
                ProductName: Product_Name,
                ProductDesc: Product_Desc,
                ProductQunatati: Product_Qunatati,
                ProductPrice: Product_Price
            }
        })
    },
    async AddProductToCatgory(Product_Id: string, Catgory_Id: string) {
        const data = await Prisma.productsCatgory.create({
            data: {
                Product_Id: Product_Id,
                Catgory_Id: Catgory_Id
            }
        })
        return data;
    }
}