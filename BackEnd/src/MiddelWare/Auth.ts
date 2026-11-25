import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
//import { UserModule } from "../module/UserModule.js";
export interface CustomRequest extends Request {
    user?: any;
}
export const Auth = {
    Authnitcaion(req: CustomRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ Error: "Missing Or Invalid Authorization Header" })
        }
        const token = authHeader.split(" ")[1]
        try {

            const decode = jwt.verify(token, "SECRET")
            console.log(decode)
            UserModule.GetAllUsers.then(([rows]: any) => {
                const user = rows.find((elm) => elm.UserId == decode.id && elm.UserEmail === decode.email)
                req.user = user
              //  console.log(user)
                next()
            })
        }
        catch {
            res.status(401).json({ Error: "Un Authnticated User" })
        }
    },
    Authrization(req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user
        console.log("This Is Authz func")
        console.log(user)
        
          if(user.UserRole==="admin" ){next()}
            else
          return res.status(400).json({Error:"Un Authrized User"})  
    },
}