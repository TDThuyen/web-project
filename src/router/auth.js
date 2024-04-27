import express from "express";
import { auth } from "../controllers/auth.js";

const routerAuth = express.Router()

routerAuth.post("/", auth)
routerAuth.get("/", (req,res) => {
    if(req.session&&req.session.user){
        res.redirect("/home")
    }
    else {
        res.clearCookie("jwt");
        res.clearCookie("user_name");
        res.clearCookie("name");
        res.clearCookie("phoneNumber");
        res.clearCookie("address");
        res.clearCookie("birthday");
        res.clearCookie("sessionId")
        res.render("index.html")
    }
})

export default routerAuth