import { z } from 'zod'
export const UserValidation = z.object({
    UserName: z.string({ error: "User Name Should Be String" }).min(5, { error: "User Name Is Too Short" }).max(20,{error: "User Name Is Too Long" }),
    UserEmail: z.email({ error: "User Email Should Have @" }).min(10,{ error: "User Email Is Too Short" }).max(60,{ error: "User Email Is Too Long" }).lowercase(),
    UserPhone: z.string({ error: "User Phone Number Should Be String" }).min(5,{ error: "User Phone Number Is Too Short" }).max(12,{ error: "User Phone Number Is Too Long" }),
    UserPassword: z.string({ error: "User Password Should Be String " }).min(8,{ error: "User Password Is Too Short" }).max(16,{ error: "User  PasswordNumber Is Too Long" })
})
export const ProductValidation = z.object({
    ProductName: z.string({error:"Product name should be string"}).min(5, { error: "Product Name Is Too Short" }).max(50, { error: "Product Name Is Too Long" }),
    ProductDescribtion: z.string({error:"Product Description should be string"}).min(5, { error: "Product Description Is Too Short" }).max(200, { error: "Product Description Is Too Long" }),
    Productprice: z.coerce.number({ error: "Product Price Should Be Number" }),
    ProductQunantaty: z.coerce.number({ error: "Product Qunantaty Should Be Number" })
})