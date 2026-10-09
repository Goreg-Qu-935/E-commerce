import db from "./db.js";

export const UserModule =
{
    GetAllUsers: db.query("select * from Users"),
    DeleteUser: (id: string | string[] | undefined) => db.query(`Delete from Users where UeserId = ? `, [id]),
    GetSpecificUser: (id: string | string[] | undefined) => db.query(`select * from Users where UeserId = ? `, [id]),
    UpdateUser: (UserName:any, UserPhone:any, UserEmail:any, UserPassword:any, id:any) => db.query(`Update Users set UserName=?,  UserPhone=? ,UserEmail=? ,UserPassword=?   where UeserId=?`,
        [UserName, UserPhone, UserEmail, UserPassword, id]),
    Regester: (UserName:any, UserPhone:any, UserEmail:any,UserPassword:any) => db.query(`insert into  Users ( UserName , UserPhone,UserEmail,UserPassword )values(?,?,?,?)`,
        [UserName, UserPhone, UserEmail,UserPassword])
}