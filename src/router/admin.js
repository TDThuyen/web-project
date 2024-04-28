import express from "express";
import { checkPermisson } from "../middlewares/checkPermission.js";
import { postCreateUser } from "../controllers/adminController.js"
import { getUser } from "../controllers/adminController.js"
import { getUpdateUser } from "../controllers/adminController.js"
import { postUpdateUser } from "../controllers/adminController.js"
import { postDeleteUser } from "../controllers/adminController.js"
import { postDestroyMessage } from "../controllers/adminController.js"
import { addProduct } from "../controllers/adminController.js"
import { getProduct } from "../controllers/adminController.js"
import { getProductUpdate } from "../controllers/adminController.js"
import { postUpdateProduct } from "../controllers/adminController.js"
import { postDeleteProduct } from "../controllers/adminController.js"
import { deleteProduct } from "../controllers/adminController.js"
import { getProductDetails } from "../controllers/adminController.js"

// orders 
import { pendingProducts } from "../controllers/adminController.js"
import { confirmedProducts } from "../controllers/adminController.js"
import { deliveringProducts } from "../controllers/adminController.js"
import { deliveredProducts } from "../controllers/adminController.js"
import { cancelledProducts } from "../controllers/adminController.js"

import { convertPendingStatus } from "../controllers/adminController.js"
import { convertConfirmedStatus } from "../controllers/adminController.js"
import { convertDeliveringStatus } from "../controllers/adminController.js"
import { convertDeliveredStatus } from "../controllers/adminController.js"
import { convertCancelledStatus } from "../controllers/adminController.js"

import { getOrderDetails } from "../controllers/adminController.js"

import { findOrder } from "../controllers/adminController.js"

const routerAdmin = express.Router()
routerAdmin.get("/", checkPermisson, (req, res) => {
    res.render("indexAdmin.html")
})

// hien thi user 
routerAdmin.get("/UserManagement", getUser)

// update user , dau hai cham de truyen dong, lay thong tin nguoi dung
routerAdmin.get("/update/:id", getUpdateUser)

// update user sua thong tin nguoi dung 
routerAdmin.post("/updateUser", checkPermisson, postUpdateUser)

// delete user 
//confirm user
routerAdmin.post("/delete-user/:id", postDeleteUser);
//delete
routerAdmin.post("/delete-user", postDestroyMessage);

routerAdmin.post("/USER", checkPermisson, postCreateUser)

///////////////////////////////////////////////////////////////////////////

// them san pham
routerAdmin.post("/addProduct", checkPermisson, addProduct)

// hien thi san pham
routerAdmin.get("/ProductManagement", getProduct)

// chi tiet san pham 
routerAdmin.get("/getProductDetails/:id", getProductDetails)

// do du lieu vao trong sua san pham khi bam edit
routerAdmin.get("/getProductDetails/:id/:color_id", getProductUpdate)

// update san pham 
routerAdmin.post("/updateProduct", postUpdateProduct)

//delete product 
//confirm product
routerAdmin.post("/delete-product/:id/:color_id", postDeleteProduct)
// delete product 
routerAdmin.post("/delete-product", deleteProduct)


////////////////////////////////////////////////////////////////////////////////////////

//order Management:
//pending 
routerAdmin.get("/orderManagement/pending", pendingProducts)
// luu trang thai dang tu 1 sang 2 
routerAdmin.post("/orderManagement/:id", convertPendingStatus)


// //confirmed
routerAdmin.get("/orderManagement/confirmed", confirmedProducts)
routerAdmin.post("/orderManagement/:id", convertConfirmedStatus)



// //delivering
routerAdmin.get("/orderManagement/delivering", deliveringProducts)
routerAdmin.post("/orderManagement/:id", convertDeliveringStatus)

// //delivered
routerAdmin.get("/orderManagement/delivered", deliveredProducts)
routerAdmin.post("/orderManagement/:id", convertDeliveredStatus)

// //cancelled
routerAdmin.get("/orderManagement/cancelled", cancelledProducts)
routerAdmin.post("/orderManagement/:id", convertCancelledStatus)

// orderdetail 
routerAdmin.get("/orderDetails/:id", getOrderDetails)



///////////////////////////////////////////////////////////////////////////////////////////////////////
//tim kiem don hang: 
routerAdmin.get("/searchOrder", findOrder)


export default routerAdmin;