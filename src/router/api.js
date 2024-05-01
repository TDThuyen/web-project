import express from "express";
import getCart from "../controllers/getCart.js";
import getNumberOfProducts from "../controllers/getNumberOfProducts.js";
import getProductByID from "../controllers/getProductByID.js";
import getProductDetail from "../controllers/getProductDetail.js";
import getProducts from "../controllers/getProducts.js";
import Evaluate from "../models/Evaluate.js";
import connection from "../models/connectSQL.js";
import rateAVG from "../models/rateAVG.js";

const routerAPI = express.Router()

routerAPI.get("/getProducts/:page", getProducts)
routerAPI.get("/getProductDetail/id=:id", getProductDetail)
routerAPI.get("/getProduct/id=:id", getProductByID)
routerAPI.get("/getProducts/q=:q/:page", getProducts)
routerAPI.get("/getProducts/collection=:collection/:page", getProducts)
routerAPI.get("/getNumberOfProducts", getNumberOfProducts)
routerAPI.get("/getNumberOfProducts/q=:q", getNumberOfProducts)
routerAPI.get("/getNumberOfProducts/collection=:collection", getNumberOfProducts)
routerAPI.get("/getMyCart", getCart)

routerAPI.get("/getMyOrders", (req,res)=>{
    if(req.session?.user){
        connection.query(`select * from orders where customer_id = ${req.session.user.customer_id}`,(error, results, fields) => {
            if(results){
                res.json(results);
            }
          })
        }
        else res.json("")
})

routerAPI.get("/getMyComment/id=:id", async (req, res) => {
    try {
        const myComment = await Evaluate.findOne({
            product_id: req.params.id,
            customer_id: req.session.user.customer_id
        })
        if (myComment) {
            res.json(myComment)
        }
        else {
            res.json("")
        }
    } catch (error) {
        console.log(error)
    }
})
routerAPI.get("/getComment/id=:id", async (req, res) => {
    try {
        const comment = await Evaluate.find({
            product_id: req.params.id
        })
        if (comment) {
            if(req.session.user){
                const myID = req.session.user.customer_id;
                res.json(comment.filter(obj => obj.customer_id !== myID))
            }
            else {
                res.json(comment)
            }
        }
        else {
            res.json("")
        }
    } catch (error) {
        console.log(error)
    }
})
routerAPI.get("/getRate/id=:id", async (req, res) => {
    try {
        const rate = await rateAVG.findOne({
            product_id: req.params.id
        })
        if (rate) {
            const rateAVG = (rate.rate_sum / rate.user_sum).toFixed(1);
            res.json(rateAVG);
        }
        else {
            res.json("")
        }
    } catch (error) {
        console.log(error)
    }
})
routerAPI.delete("/deleteStatusCookie", (req,res) => {
    res.clearCookie("status")
    res.end();
})
routerAPI.get("/getNumberOfProductsOfMyCart", (req,res) => {
    if(req.session?.user){
    connection.query(`select count(*) as itemCount from cart where customer_id = ${req.session.user.customer_id}`,(error, results, fields) => {
        if(results){
            if(results[0]) {
                res.json(results)
            }
            else {
                res.json("")
            }
        }
      })
    }
    else res.json("")
})

routerAPI.get("/ordered/orderDetail/id=:id",(req,res)=>{
    connection.query(`select orderDetail.total_amout, orderDetail.quantity, products.product_name, product_detail.color from orderDetail inner join products on orderDetail.product_id = products.product_id
    inner join product_detail on orderDetail.id_prod = product_detail.id_prod
    where order_id = ${req.params.id}`,(error, results, fields) => {
        if(results){
            res.json(results);
        }
        else {
            res.json("")
        }
      })
    })

export default routerAPI;

