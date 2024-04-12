import express from "express";
import { auth } from "../controllers/auth.js";
const routerAuth = express.Router()

routerAuth.post("/", auth)
routerAuth.get("/", (req,res) => {
    res.render("index.html")
})
routerAuth.get("/home", (req,res) => {
    res.render("user.html")
})
export default routerAuth