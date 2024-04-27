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
      connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.ing_mid, portfolio.name,sales.quantity_sold,sales.discount
      from products 
      left join portfolio on products.id_port = portfolio.id_port
      left join sales
            on products.product_id = sales.product_id;`, async (error, results, fields) =>{
          const products = JSON.stringify(results);
          products.replace(/\s/g, "");
          const paginatedProducts = JSON.parse(products).slice(start, end);
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