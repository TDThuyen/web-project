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
app.use(json())

connect(URI_DB)

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
})

