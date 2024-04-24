import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from products`, async (error, results, fields) =>{
        const products = results
        const page = parseInt(req.params.page);
        const perPage = 16; // Số sản phẩm mỗi trang
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedProducts = products?.slice(start, end);
        res.json(paginatedProducts);
    })
  } catch(error){
    console.log(error);
} 

};