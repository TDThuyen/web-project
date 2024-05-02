import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    connection.query(`select products.product_name,products.img_top,cart.cart_id, cart.total_amount as total_amount,cart.quantity,product_detail.color, (total_amount/cart.quantity)as price
    from cart left join product_detail on cart.id_prod = product_detail.id_prod
    left join products on product_detail.product_id = products.product_id
    where cart.customer_id = ${req.session.user.customer_id}`, async (error, results, fields) =>{
        const products = JSON.stringify(results)
        res.json(results);
    })
  } catch(error){
    console.log(error);
} 
};


