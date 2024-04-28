import express from "express";
import transaction from "../controllers/transaction.js";

const routerCart = express.Router()
routerCart.post("/",transaction)
routerCart.get("/",(req,res)=>{
    res.render("test.html")
})

export default routerCart;