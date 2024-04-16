import express from "express";
import { home } from "../controllers/home.js";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerHome = express.Router()
routerHome.get("/", checkPermisson, (req,res) => {
    res.render("user.html")
})

routerHome.post("/", home)

export default routerHome;