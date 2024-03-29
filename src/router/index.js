import express from "express";
import routerAuth from "./auth.js";
import routerProduct from "./product.js";

const router = express.Router()

router.use("/auth", routerAuth);
router.use("/product", routerProduct)
router.use(express.json())

export default router;