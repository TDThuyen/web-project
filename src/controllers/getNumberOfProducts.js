import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    // sửa dữ liệu trong database
    const data = await redisClient.get("getNumberOfProducts");
    if(!data){
      connection.query(`select count(*) as "ProductsNumber"  from products`, async (error, results, fields) =>{
          redisClient.set("getNumberOfProducts",JSON.stringify(results));
          res.json(results);
      })
    }
    else{
      res.json(JSON.parse(data));
    }
  } catch(error){
    console.log(error);
} 

};

