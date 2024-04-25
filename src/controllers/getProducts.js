import dotenv from "dotenv";
import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";
dotenv.config();

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const perPage = 16; // Số sản phẩm mỗi trang
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = await redisClient.get(`getProducts/${page}`);
    if(!data){
      connection.query(`select product_id, product_name, quantity_stock,img_top,img_mid,img_bot from products`, async (error, results, fields) =>{
          const products = results
          const paginatedProducts = products.slice(start, end);
          redisClient.setEx(`getProducts/${page}`,process.env.REDIS_END_TIME,JSON.stringify(paginatedProducts));
          res.json(paginatedProducts);
      })
    }
    else {
      res.json(JSON.parse(data));
    }
  } catch(error){
    console.log(error);
} 

};