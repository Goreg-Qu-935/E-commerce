import db from "./db.js";
export const ProductModule = {
    GetAllProducts: db.query("SELECT * FROM Products"),
    SpecificProduct: (id: any) => db.query(`SELECT * FROM Products where ProductId = ?`, [id]),
    UpdateProduct: (ProductName: any, ProductDescribtion: any, Productprice: any, ProductQunantaty: any, id: any) =>
        db.query(`UPDATE Products SET ProductName=? , ProductDescribtion=? , Productprice=? , ProductQunantaty=?  WHERE ProductId=?`,
            [ProductName, ProductDescribtion, Productprice, ProductQunantaty, id]),
    DeleteProduct: (id: any) => db.query(`delete from Products where ProductId=?`, [id]),
    AddProduct: (ProductName: any, ProductDescribtion: any, Productprice: any, ProductQunantaty: any) => db.query(`INSERT INTO Products (ProductName, ProductDescribtion, Productprice, ProductQunantaty) VALUES (?, ?, ?, ?)`,
        [ProductName, ProductDescribtion, Productprice, ProductQunantaty])


}