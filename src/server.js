import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import router from "./router/index.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB

app.use(express.json())

connect(URI_DB)

app.use("/api",router)


app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
})
