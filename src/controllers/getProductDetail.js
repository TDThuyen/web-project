import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default (req, res) => {
  try {
    // sửa dữ liệu trong database
    connection.query(`select * from products inner join product_detail on products.product_id = product_detail.product_id
    where products.product_id = ${req.params.id}`, async (error, results, fields) =>{
        const productDetail = JSON.stringify(results);
        const response = JSON.parse(productDetail)
        if (isValidJson(response)) {
          console.log('Chuỗi JSON hợp lệ.');
      } else {
          console.log('Chuỗi JSON không hợp lệ.');
      }
        res.json(response);
    })
  } catch(error){
    console.log(error);
} 
};

function isValidJson(jsonString) {
  try {
      JSON.parse(jsonString);
      return true;
  } catch (error) {
      return false;
  }
}

