import express from "express";
import { auth } from "../controllers/auth.js";

const routerAuth = express.Router()

routerAuth.post("/", auth)
routerAuth.get("/", (req,res) => {
    if(req.session.user){
        res.redirect("/home")
    }
    else res.render("index.html")
})

export default routerAuth