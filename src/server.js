import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import configViewEngine from "./config/viewEngine.js";
import router from "./router/index.js";
const app = express();

configViewEngine(app);
app.use(express.urlencoded({extended: false}))
config();

const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB
const MONGO_DB = process.env.MONGO_DB
app.use(json())
app.use(cookieParser())

// connect(URI_DB)

connect(MONGO_DB)
    .then(() => {
        console.log('Connect database sucess')
    })
    .catch((er) => {
        console.log(er)
    })

app.use(router)

app.use((req,res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
})