import { PrismaClient } from "../generated/prisma/client.js";
const Prisma = new PrismaClient()

export const UserModule = {
   async Register(User_Name: string, User_Email: string, User_Password: string) {
        const data = await Prisma.Users.create({
            data: {
                UserName: User_Name,
                UserEmail: User_Email,
                UserPassword: User_Password
            }
        })
        return data
    },
   async LogIn(User_Email:string) {
       const data = await Prisma.users.findFirst({
            where: {
                UserEmail: User_Email
            }
        })
        return data;
    },
    async GetAllUsers(){
        const data = await Prisma.users.findMany({})
        return data
    },
    async GetSpecificUser(User_Id:string){
        const data = await Prisma.users.findFirst({
            where:{
                UserId:User_Id
            }
        })
        return data
    },
    async UpDateUser(User_Name: string, User_Email: string, User_Password: string, User_Id: string) {
        await Prisma.users.update({
            where: {
                UserId: User_Id
            },
            data: {
                UserName: User_Name,
                UserEmail: User_Email,
                UserPassword: User_Password
            }
        })
    }
    ,
    async DeleteUser(User_Id: string) {
        await Prisma.users.delete({
            where: {
                UserId: User_Id
            }
        })
    }
}