import { Router } from "express";
import productDetail from "../controllers/productDetail.js";

const routerProduct = Router();

routerProduct.get("/id=:id",(req,res)=>{
    res.render("productDetail.html")
})
routerProduct.post("/is=:id",productDetail)

export default routerProduct;