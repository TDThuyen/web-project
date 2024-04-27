import express from "express";
import getNumberOfProducts from "../controllers/getNumberOfProducts.js";
import getProductByID from "../controllers/getProductByID.js";
import getProductDetail from "../controllers/getProductDetail.js";
import getProducts from "../controllers/getProducts.js";
import Evaluate from "../models/Evaluate.js";
import redisClient from "../models/connectRedis.js";
import rateAVG from "../models/rateAVG.js";

const routerAPI = express.Router()

routerAPI.get("/getProducts/:page",getProducts)
routerAPI.get("/getProductDetail/id=:id",getProductDetail)
routerAPI.get("/getProduct/id=:id",getProductByID)
routerAPI.get("/getProducts/q=:q/:page",getProducts)
routerAPI.get("/getProducts/collection=:collection/:page",getProducts)
routerAPI.get("/getNumberOfProducts",getNumberOfProducts)
routerAPI.get("/getNumberOfProducts/q=:q",getNumberOfProducts)
routerAPI.get("/getNumberOfProducts/collection=:collection",getNumberOfProducts)

routerAPI.get("/getMyComment/id=:id", async(req,res) => {
    try{
        const myComment = await Evaluate.findOne({
            product_id: req.params.id,
            customer_id: await getUserID(req)
        })
        if(myComment){
            res.json(myComment)
        }
        else{
            res.json("")
        }
    } catch(error){
        console.log(error)
    }
})
routerAPI.get("/getComment/id=:id", async(req,res) => {
    try{
        const comment = await Evaluate.find({
            product_id: req.params.id
        })
        if(comment){
            const myID = await getUserID(req);
            res.json(comment.filter(obj => obj.customer_id !== myID))
        }
        else{
            res.json("")
        }
    } catch(error){
        console.log(error)
    }
})
routerAPI.get("/getRate/id=:id", async(req,res)=>{
    try{
        const rate = await rateAVG.findOne({
            product_id: req.params.id
        })
        if(rate){
            const rateAVG = (rate.rate_sum/rate.user_sum).toFixed(1);
            res.json(rateAVG);
        }
        else{
            res.json("")
        }
    }catch(error){
        console.log(error)
    }
})
export default routerAPI;

async function getUserID(req){
    if(req.sessionID&&req.session.user){
        const user = JSON.parse(await redisClient.get("sess:"+req.sessionID))
        return user?.user.customer_id
    }
    else {
        return -1;
    }
}