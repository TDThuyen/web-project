import { Router } from "express";
import { create, getAll, getById, getDetail, remove, update } from "../controllers/product.js";

const routerProduct = Router();

routerProduct.get('/', getAll)
routerProduct.get('/getDetail/get',getDetail)
routerProduct.get('/:id', getById)
routerProduct.post('/create', create)
routerProduct.put('/update', update)
routerProduct.delete('/remove', remove)

export default routerProduct;