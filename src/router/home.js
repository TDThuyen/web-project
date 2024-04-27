import express from "express";
import { home } from "../controllers/home.js";
import { checkPermisson } from "../middlewares/checkPermission.js";
import uploadCloud from "../middlewares/upload.cjs";

const routerHome = express.Router()
routerHome.use("/",checkPermisson)
routerHome.get("/", (req,res) => {
    if(req.session.user) {
        res.render("index.html")
    }
})
routerHome.post("/",uploadCloud.single("image"), home)

export default routerHome;