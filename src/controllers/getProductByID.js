
import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from products left join sales
      on products.product_id = sales.product_id where products.product_id = ${req.params.id} limit 1`, async (error, results, fields) =>{
        const product = JSON.stringify(results)
        product.replace(/\s/g, "");
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 
};

