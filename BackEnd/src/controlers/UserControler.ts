import type { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserValidation } from "../MiddelWare/zod.js"
import { OAuth2Client } from "google-auth-library"
import { UserModule } from "../module/UsersModule.js";



const Clint = new OAuth2Client(
    process.env.client_id,
    process.env.ClientSecret,
    process.env.redirect_uri
)

export const Users = {
    Regester(req: Request, res: Response) {
        try {

            const { UserName, UserEmail, UserPassword } = req.body
            const result: any = UserValidation.safeParse({ UserName, UserEmail, UserPassword })
            if (!result.success) {
                const errorMessage = JSON.parse(result.error)
                return res.status(400).json({ error: errorMessage[0].message })
            }

            bcrypt.hash(UserPassword, 10).then((HashedPass: any) => {

                UserModule.Register(UserName, UserEmail, HashedPass).then((result: any) => {
                    const ID = result.insertId;
                    console.log("Done Adding The User")
                    const token = jwt.sign({ id: ID, name: UserName, email: UserEmail, UserRole: "user" }, "SECRET")
                    res.status(200).json({ message: "Done Adding The User", Token: token })
                })
            })
        } catch {

            res.status(500).json({ Error: "You Should Enter Some Values" })
        }


    },

    LogIn(req: Request, res: Response) {
        const { UserName, UserEmail, UserPassword } = req.body;
        const result: any = UserValidation.safeParse({ UserName, UserEmail, UserPassword })
        
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        }
        
        UserModule.LogIn(UserEmail).then((data: any) => {
            console.log(data)
            if (data.length === 0) { res.status(500).json({ Error: "Can't Find User" }) }
            const { UserId, UserName } = data
            const Password = data.UserPassword

            bcrypt.compare(UserPassword, Password).then((Hashed: any) => {
                    console.log(Hashed)
                    if (!Hashed) { res.status(401).json({ Error: "Wroung Password" }) }
                    const token = jwt.sign({ id: UserId, name: UserName, email: UserEmail }, "SECRET")
                  return  res.status(200).json({ Message: "Done Loging in ", Token: token })
                })
        }).catch(() => { res.status(401).json({ Error: "Can't Find User" }) })
    },
    GoogleAuth(req: Request, res: Response) {
        const url = Clint.generateAuthUrl({
            access_type: "offline",
            scope: ["profile", "email"]
        })

    },
    async GoogleAuthSuccess(req: Request, res: Response) {
        const code = req.query.code;
        try {
            const { tokens } = await Clint.getToken(code);

            const ticket = await client.verifyIdToken({
                idToken: tokens.id_token,
                audience: process.env.client_id
            });
            const payload = ticket.getPayload();
            const token = jwt.sign({ id: payload?.name, UserName: payload?.name, Email: payload?.email }, "SECRET")
            res.redirect(`http://localhost:5173/auth/google/success?token=${token}`);

        } catch {
            res.status(400).json({ Error: "Authntication Failed" })
        }
    },

    GetAll(req: Request, res: Response) {
        UserModule.GetAllUsers().then((data)=>{
            res.status(200).json(data)
        }).catch(()=>{
            res.status(500).json({Error:"Can't Get The User"})
        })
    },

    SpecificUser(req: Request, res: Response) {
        UserModule.GetSpecificUser(req.params.id).then((data) => {
            data
            res.status(200).json(data)
        }).catch(() => {
            res.status(500).json({Error:"Can't Get The User"})
        })
    },

    Delete(req: Request, res: Response) {
        UserModule.DeleteUser(req.params.id).then(() => {
            res.status(200).json({ message: "Done Deleting The User" })
        }).catch(() => {
            res.status(500).json({ error: "Can't Delete The User" })
        })

    },

    Update(req: Request, res: Response) {
        
        const { UserName, UserPhone, UserEmail, UserPassword } = req.body
        const result: any = UserValidation.safeParse({ UserName, UserPhone, UserEmail, UserPassword })
        if (!result.success) {
            const errorMessage = JSON.parse(result.error)
            return res.status(400).json({ error: errorMessage[0].message })
        }
        UserModule.UpDateUser(UserName, UserEmail, UserPassword, req.params.id).then(() => {
            console.log("Done Adding The User")
            res.status(200).json({ message: "Done Updateing The User" })
        })
    }

}