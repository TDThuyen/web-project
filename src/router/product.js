import { Router } from "express";

const routerProduct = Router();

routerProduct.get("/id=:id",(req,res)=>{
    res.render("productDetail.html")
})

export default routerProduct;