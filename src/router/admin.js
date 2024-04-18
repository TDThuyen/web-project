import express from "express";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerAdmin = express.Router()
routerAdmin.get("/", checkPermisson, (req,res) => {
    res.render("indexAdmin.html")
})
routerAdmin.get("/UserManagement", checkPermisson, (req,res) => {
    res.render("UserManagement.html")
})
routerAdmin.get("/ProductManagement", checkPermisson, (req,res) => {
    res.render("ProductManagement.html")
})

export default routerAdmin;