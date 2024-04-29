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
    if (!req.params.q && !req.params.collection) {
        connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.ing_mid,products.quantity_sold,sales.discount 
        from products left join sales
        on products.product_id = sales.product_id`, async (error, results, fields) => {
          const products = JSON.stringify(results);
          if(products){
            products.replace(/\s/g, "");
            const paginatedProducts = JSON.parse(products).slice(start, end);
            redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(paginatedProducts));
            res.json(paginatedProducts);
          }
          else{
            res.json("")
          }
        })
      }
    if (req.params.q) {
      const q = req.params.q;
      connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.ing_mid,products.quantity_sold,sales.discount 
      from products left join sales
      on products.product_id = sales.product_id
          where products.product_name like "%${q}%"`, async (error, results, fields) => {
        const products = JSON.stringify(results);
        if(products){
          products.replace(/\s/g, "");
          const paginatedProducts = JSON.parse(products).slice(start, end);
          redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(paginatedProducts));
          res.json(paginatedProducts);
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
        connection.query(`select products.product_id,products.product_name,products.quantity_stock,products.id_port,products.price,products.img_top,products.ing_mid,products.quantity_sold,sales.discount 
        from products left join sales
        on products.product_id = sales.product_id
        where products.id_port = ${collection}`, async (error, results, fields) => {
          const products = JSON.stringify(results);
          if(products){
            products.replace(/\s/g, "");
            const paginatedProducts = JSON.parse(products).slice(start, end);
            redisClient.setEx(`getProducts/${page}`, process.env.REDIS_END_TIME, JSON.stringify(paginatedProducts));
            res.json(paginatedProducts);
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