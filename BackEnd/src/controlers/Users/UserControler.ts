import type { Request, Response } from "express";
import { UserModule } from "../../module/UserModule.js";
import { UserValidation } from "../../module/zod.js"

export const Users = {
    Regester(req: Request, res: Response) {

        const { UserName, UserPhone, UserEmail, UserPassword } = req.body
        const result = UserValidation.safeParse({ UserName, UserPhone, UserEmail, UserPassword })
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        }
        UserModule.Regester(UserName, UserPhone, UserEmail, UserPassword).then(() => {
            console.log("Done Adding The User")
            res.status(200).json({ message: "Done Adding The User" })
        })

    },

    LogIn(req: Request, res: Response) {
        res.send("<h1> This Is Login Page2  </h1>")

    },

    GetAll(req: Request, res: Response) {
        UserModule.GetAllUsers.then((arr) => {
            const [rows] = arr
            res.send(rows)
        })
    },

    SpecificUser(req: Request, res: Response) {

        UserModule.GetSpecificUser(req.params.id).then((arr) => {
            const [rows] = arr
            res.send(rows)
        }).catch(() => {
            console.log("from s usre")
        })
    },

    Delete(req: Request, res: Response) {
        UserModule.DeleteUser(req.params.id).then(() => {
            res.status(200).json({ message: "Done Deleting" })
        }).catch(() => {
            res.status(500).json({ error: "Error" })
        })

    },

    Update(req: Request, res: Response) {
        console.log(req.body)
        const {UserName,UserPhone,UserEmail,UserPassword } = req.body
        const result = UserValidation.safeParse({ UserName, UserPhone, UserEmail, UserPassword })
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        }
        UserModule.UpdateUser(UserName, UserPhone, UserEmail, UserPassword,req.params.id).then(() => {
            console.log("Done Adding The User")
            res.status(200).json({ message: "Done Adding The User" })
        })
    }

}