import express from "express";
import db from './module/db.js'
//import env  from "dotenv";

import catgory from './Routs/catgory.js'
import Products from './Routs/Prducts.js'
import Users from './Routs/Users.js'


import cors from "cors";

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));


db.getConnection().then(() => {
    console.log("Done Connting to the  db ")
})

app.use('/api', catgory);

app.use('/api', Products);
app.use('/api', Users);
//console.log(process.env.PORT)
//const ENV=env.config({path:"./config.env"})
//ENV.parsed.PORT

app.listen(3000, (err) => {
    if (!err)
        console.log("done connectiong")
    else
        console.log("there are erres on connecting")
})
app.use((req, res) => {
    res.send("<h1>Error Page Isnt found</h1>")
})