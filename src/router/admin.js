import express from "express";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerAdmin = express.Router()
routerAdmin.get("/", checkPermisson, (req,res) => {
    res.render("indexAdmin.html")
})

export default routerAdmin;