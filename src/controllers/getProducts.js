import dotenv from "dotenv";
import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";
dotenv.config();

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    if (!req.params.q && !req.params.collection) {
        const data = await redisClient.get(`getProducts/${page}`);
        if(data) res.json(JSON.parse(data)); 
        else {
          connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.img_mid,products.quantity_sold,sales.discount 
          from products left join sales
          on products.product_id = sales.product_id limit ${16*(page-1)},16`, async (error, results, fields) => {
            if(results){
              redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(results));
              res.json(results);
            }
            else{
              res.json("")
            }
          })
        }
      }
    if (req.params.q) {
      const q = req.params.q;
      connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.img_mid,products.quantity_sold,sales.discount 
      from products left join sales
      on products.product_id = sales.product_id
          where products.product_name like "%${q}% limit ${16*(page-1)},16`, async (error, results, fields) => {
            if(results){
              redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(results));
              res.json(results);
            }
            else{
              res.json("")
            }
      })
    }
    if (req.params.collection) {
      let collection = req.params.collection;
      if(collection === "phong__ngu") collection = 1;
      else if(collection === "phong__an") collection = 2;
      else if(collection === "phong__khach") collection = 3;
      else if(collection === "phong__lam__viec") collection = 4;
      else if(collection === "tu__bep") collection = 5;
      else res.send("404 not found");
      const data = await redisClient.get(`getProducts/collection=${collection}/${page}`);
      if (!data) {
        connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.img_mid,products.quantity_sold,sales.discount 
        from products left join sales
        on products.product_id = sales.product_id
        where products.id_port = ${collection} limit ${16*(page-1)},16`, async (error, results, fields) => {
          const products = JSON.stringify(results);
          if(results){
            redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(results));
            res.json(results);
          }
          else{
            res.json("")
          }
        })
      }
      else {
        res.json(JSON.parse(data));
      }
    }
  } catch (error) {
    console.log(error);
  }

};