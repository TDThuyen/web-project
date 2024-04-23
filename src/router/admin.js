import express, { Router } from "express";
import { checkPermisson } from "../middlewares/checkPermission.js";

import bodyParser from "body-parser";

const routerAdmin = express.Router();

// // Khai báo và sử dụng bodyParser trước khi sử dụng routerAdmin
// routerAdmin.use(bodyParser.urlencoded({ extended: false }));

routerAdmin.get("/", checkPermisson, (req,res) => {
    res.render("indexAdmin.html")
})
routerAdmin.get("/UserManagement", checkPermisson, (req,res) => {
    res.render("UserManagement.html")
})




export default routerAdmin;