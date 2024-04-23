import { Router } from "express";
import { create, getAll, getById, getDetail, remove, update } from "../controllers/product.js";
import { checkPermisson } from "../middlewares/checkPermission.js";
import connection from '../models/connectSQL.js';

const routerProduct = Router();

routerProduct.get('/', getAll)
routerProduct.get('/getDetail/get',getDetail)
routerProduct.get('/:id', getById)
routerProduct.post('/create', checkPermisson, create)
routerProduct.put('/update', checkPermisson, update)
// routerProduct.delete('/remove', checkPermisson, remove)
routerProduct.get("/ProductManagement", checkPermisson, (req,res) => {
    connection.query("SELECT * from products ORDER BY product_id ASC", function (err, data) {
        res.render("ProductManagement.html", {
          data: data
        });
      });
});


routerProduct.delete('/xoa-danh-muc/:product_id', checkPermisson, function(req, res) {
    let id = req.params.product_id;
    let sql_delete = "DELETE FROM products WHERE product_id = ?";
    connection.query(sql_delete, [id], function(err, data) {
        if (err) {
            console.error('Lỗi khi xóa sản phẩm: ' + err.message);
            return;
        }
        else {
            if (data.affectedRows > 0) {
                res.redirect('/danh-muc');
            } else {
                console.log(`Không tìm thấy sản phẩm để xóa với id: ${id}`);
                res.status(404).send("Không tìm thấy sản phẩm để xóa");
            }
        }
    });
});

export default routerProduct;