
import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from products where product_id = ${req.params.id}`, async (error, results, fields) =>{
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 
};

