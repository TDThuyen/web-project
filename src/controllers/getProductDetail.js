import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from products inner join product_detail on products.product_id = product_detail.product_id
    where products.product_id = ${req.params.id}`, async (error, results, fields) =>{
        const numberOfProducts = results
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 

};