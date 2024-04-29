import { Router } from "express";

const routerOrders = Router();

routerOrders.get("/", (req,res) =>{
    res.render("ordered.html")
})

routerOrders.get("/orderDetail/id=:id", (req,res) =>{
    res.render("orderDetail.html")
})

export default routerOrders;