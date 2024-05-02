import express from "express";
import { home } from "../controllers/home.js";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerHome = express.Router()
routerHome.use("/",checkPermisson)
routerHome.get("/", (req,res) => {
    res.render("index.html")
})
routerHome.post("/", home)

export default routerHome;