import { Router } from "express";
import productDetail from "../controllers/productDetail.js";

const routerProduct = Router();

routerProduct.get("/id=:id",(req,res)=>{
    res.render("productDetail.html")
})
routerProduct.post("/id=:id",productDetail)
routerProduct.get("/q=:q",(req,res)=>{
    res.render("index.html")
})
routerProduct.get("/collection=:collection",(req,res)=>{
    res.render("index.html")
})


export default routerProduct;