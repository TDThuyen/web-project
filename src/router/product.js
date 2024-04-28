import { Router } from "express";
import { auth } from "../controllers/auth.js";
import productDetail from "../controllers/productDetail.js";

const routerProduct = Router();

routerProduct.get("/id=:id",(req,res)=>{
    res.render("productDetail.html")
})
routerProduct.post("/id=:id",productDetail)
routerProduct.get("/q=:q",(req,res)=>{
    res.render("index.html")
})
routerProduct.post("/q=:q",auth)
routerProduct.get("/collection=:collection",(req,res)=>{
    res.render("index.html")
})
routerProduct.post("/collection=:collection",auth)


export default routerProduct;