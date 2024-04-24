import express from "express";
import getNumberOfProducts from "../controllers/getNumberOfProducts.js";
import getProducts from "../controllers/getProducts.js";

const routerAPI = express.Router()

routerAPI.get("/getProducts/:page",getProducts)
routerAPI.get("/getNumberOfProducts",getNumberOfProducts)
export default routerAPI;