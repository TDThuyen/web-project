import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select count(*) as "ProductsNumber"  from products`, async (error, results, fields) =>{
        const numberOfProducts = results
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 

};