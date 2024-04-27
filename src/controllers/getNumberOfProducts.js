import dotenv from "dotenv";
import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";

dotenv.config();

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    // sửa dữ liệu trong database
    if(!req.params.q&&!req.params.collection){
      const data = await redisClient.get("getNumberOfProducts");
      if(!data){
        connection.query(`select count(*) as "ProductsNumber"  from products`, async (error, results, fields) =>{
            redisClient.setEx("getNumberOfProducts",process.env.REDIS_END_TIME,JSON.stringify(results));
            res.json(results);
        })
      }
      else{
        res.json(JSON.parse(data));
      }
    }
    else if (req.params.q){
      const q = req.params.q
      connection.query(`select count(*) as "ProductsNumber"  from products where products.product_name like "%${q}%"`, async (error, results, fields) =>{
        res.json(results);
      })
    }
    else if (req.params.collection){
      let collection = req.params.collection;
      if(collection === "phong__ngu") collection = 1;
      else if(collection === "phong__an") collection = 2;
      else if(collection === "phong__khach") collection = 3;
      else if(collection === "phong__lam__viec") collection = 4;
      else if(collection === "tu__bep") collection = 5;
      else res.send("404 not found");
      connection.query(`select count(*) as "ProductsNumber"  from products where id_port=${collection}`, async (error, results, fields) =>{
        res.json(results);
      })
    }
  } catch(error){
    console.log(error);
} 

};

