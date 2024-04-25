import express from "express";
import getNumberOfProducts from "../controllers/getNumberOfProducts.js";
import getProductByID from "../controllers/getProductByID.js";
import getProductDetail from "../controllers/getProductDetail.js";
import getProducts from "../controllers/getProducts.js";

const routerAPI = express.Router()

routerAPI.get("/getProducts/:page",getProducts)
routerAPI.get("/getNumberOfProducts",getNumberOfProducts)
routerAPI.get("/getProductDetail/id=:id",getProductDetail)
routerAPI.get("/getProduct/id=:id",getProductByID)
export default routerAPI;