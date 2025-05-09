import { Router } from "express";

const routerOrders = Router();

routerOrders.get("/", (req,res) =>{
    res.render("ordered.html")
})

routerOrders.post("/", (req,res)=>{
    console.log(req.body);
    res.json("")
})

export default routerOrders;