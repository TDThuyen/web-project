import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from product_detail where product_id = ${req.params.id}`, async (error, results, fields) =>{
        const product_detail = JSON.stringify(results).replace(/\s/g, "");
        res.json(JSON.parse(product_detail));
    })
  } catch(error){
    console.log(error);
} 
};