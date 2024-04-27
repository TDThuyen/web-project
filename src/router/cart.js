import express from "express";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerCart = express.Router()
routerAdmin.get("/", checkPermisson, (req,res) => {
    res.render("cart.html")
})

export default routerCart;