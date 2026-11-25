import 'dotenv/config';
import * as dotenv from "dotenv";

import express from "express";
import catgory from './Routs/catgory.js'
import Products from './Routs/Product.js'
import Users from './Routs/Users.js'
import cart from "./Routs/cart.js"

import cors from "cors";

const app = express();
dotenv.config({ path: ".env" ,override:true});
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/api', catgory);
app.use('/api', cart);
app.use('/api', Products);
app.use('/api', Users);

app.listen(3000, (err) => {
    if (!err)
        console.log("done connectiong")
    else
        console.log("there are erres on connecting")
})
app.use((req, res) => {
    res.send("<h1>Error Page Isnt found</h1>")
})