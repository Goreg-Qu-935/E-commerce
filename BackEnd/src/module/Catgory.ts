import db from "./db.js"
export const CatgoryModule={
    GetAllCatgory:db.query("select * from Categories"),
    GetCatgoryWithProducts:(id:any)=>db.query("  SELECT p.* FROM Products p JOIN ProductsCategories pc ON p.ProductId = pc.ProductId WHERE pc.CategoryId = ? ", [id]),
    AddCatgory:(CatgoryName:any)=>  db.query(`INSERT INTO Categories (CategoryName) VALUES (?)`,[CatgoryName]),
    UpdateCatgory:(CatgoryName:any,id:any)=>  db.query("UPDATE Categories SET CategoryName = ? where CategoryId =? ", [CatgoryName,id]),
    DeleteCatgory:(id:any)=>    db.query(`delete from Categories where CategoryId =? `,[id]),
}