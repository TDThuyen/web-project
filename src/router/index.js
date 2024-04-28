import express from "express";
import routerAdmin from "./admin.js";
import routerAPI from "./api.js";
import routerAuth from "./auth.js";
import routerCart from "./cart.js";
import routerHome from "./home.js";
import routerOrders from "./orders.js";
import routerProduct from "./product.js";
const router = express.Router()

router.use("/auth", routerAuth);
router.use("/products", routerProduct)
router.use("/home", routerHome)
router.use("/admin", routerAdmin)
router.use("/cart",routerCart)
router.use("/ordered",routerOrders)
router.use(routerAPI)
export default router;