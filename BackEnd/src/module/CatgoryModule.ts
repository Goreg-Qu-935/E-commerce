import { PrismaClient } from "../generated/prisma/client.js";
const Prisma = new PrismaClient()

export const CatgoryModule = {
    
    async CreatCatgory(Catgory_Name: string) {
        await Prisma.catgory.create({
            data: {
                CatgoryName: Catgory_Name
            }
        })
    },

    async GetAllCatgorys() {
        return await Prisma.catgory.findMany({})
    },

    async GetSpsifecCatgorys(Catgory_Id: string) {
        return await Prisma.catgory.findFirst({ where: { CatgoyId: Catgory_Id } })
    },

    async DeleteCategory(Catgory_Id: string) {
        return await Prisma.$transaction(async (tx) => {
            await tx.productsCatgory.deleteMany({
                where: { Catgory_Id },
            });
            return await tx.catgory.delete({
                where: { CatgoyId: Catgory_Id },
            });
        });
    },
    async updateCatgory(Catgory_Id: string, Catgory_name: string) {
        Prisma.catgory.update({
            where: {
                CatgoyId: Catgory_Id
            },
            data: {
                CatgoryName: Catgory_name
            }
        })
    },
    async addProductToCatogry(CatgoryId:any,ProductId:any){
        const data = await Prisma.productsCatgory.create({
            data:{
                      Product_Id:ProductId,
                      Catgory_Id:CatgoryId
            }
        })
        return data
    },
    async DeleteProductFromCatgory(ProductId:string){
        const data =await Prisma.productsCatgory.deleteMany({
            where: {
            Product_Id: ProductId 
        }
        })
        
    }
}