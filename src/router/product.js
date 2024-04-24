import { Router } from "express";
import { create, getAll, getById, getDetail, remove, update } from "../controllers/product.js";
import { checkPermisson } from "../middlewares/checkPermission.js";

const routerProduct = Router();

routerProduct.get('/', getAll)
routerProduct.get('/getDetail/get',getDetail)
routerProduct.get('/:id', getById)
routerProduct.post('/create', checkPermisson, create)
routerProduct.put('/update', checkPermisson, update)
routerProduct.delete('/remove', checkPermisson, remove)

export default routerProduct;