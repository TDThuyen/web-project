import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    connection.query(`select products.product_name,products.img_top,cart.total_amout as total_amount,cart.quantity,product_detail.color, (total_amout/cart.quantity)as price
    from cart left join product_detail on cart.id_prod = product_detail.id_prod
    left join products on product_detail.product_id = products.product_id
    where cart.customer_id = ${await getUserID(req)}`, async (error, results, fields) =>{
        const products = JSON.stringify(results)
        products.replace(/\s/g, "");
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 
};


async function getUserID(req){
    if(req.sessionID&&req.session.user){
        const user = JSON.parse(await redisClient.get("sess:"+req.sessionID))
        return user?.user.customer_id
    }
    else {
        return -1;
    }
}