import express from "express";
import { auth } from "../controllers/auth.js";
import { checkAccessed } from "../middlewares/checkAccessed.js";

const routerAuth = express.Router()

routerAuth.post("/", auth)
routerAuth.get("/", checkAccessed, (req,res) => {
    res.render("index.html")
})

export default routerAuth