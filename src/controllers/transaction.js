import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    await startTransaction();
    connection.query(`select * from cart where customer_id = ${await getUserID(req)}`, async (error, results, fields) =>{
        if (error) {
            console.error("Error fetching cart:", error);
            return;
        }
        let total_amounts = 0;
        
        for (let i = 0; i < results.length; i++) {
            const cartItem = results[i];
    
            // Lấy thông tin sản phẩm từ cartItem
            const id_prod = cartItem.id_prod;
            const quantity = cartItem.quantity;
            const total_amounts = total_amounts+cartItem.total_amount;
    
            // Thực hiện truy vấn để cập nhật thông tin sản phẩm
            connection.query(`UPDATE product_detail SET quantity_of_color = quantity_of_color - ${quantity} WHERE id_prod = ${id_prod}`, (error, results, fields) => {
                if (error) {
                    console.error("Error :", error);
                    return;
                }
            });
        }
        let order_id = null;
        connection.query(`insert into orders(customer_id,order_date,total_amount) value (${await getUserID(req)},"${new Date()}",${total_amounts})`, (error, results, fields) => {
            if (error) {
                console.error("Error :", error);
                return;
            } 
            order_id = results.insertId;
        });
        for (let i = 0; i < results.length; i++) {
            const cartItem = results[i];
            
            // Lấy thông tin sản phẩm từ cartItem
            const id_prod = cartItem.id_prod;
            const quantity = cartItem.quantity;
            const total_amount = cartItem.total_amount;
            let product_id = null;
            connection.query(`select product_id from products 
            inner join product_detail on products.product_id = product_detail.product_id
            where product_detail.id_prod = ${id_prod}`, (error, results, fields) => {
                if (error) {
                    console.error("Error :", error);
                    return;
                } 
                if(result) product_id = results[0].product_id
            });
    
            // Thực hiện truy vấn để cập nhật thông tin sản phẩm
            connection.query(`insert into order_detail(product_id,id_prod,order_id,quantity,total_amount) value(${product_id},${id_prod},${order_id},${quantity},${total_amount})`, (error, results, fields) => {
                if (error) {
                    console.error("Error :", error);
                    return;
                }
            });
        }

    })
    await commitTransaction();

    console.log('Transaction completed successfully.');
  } catch(error){
    await rollbackTransaction();
        console.error('Transaction failed:', error);
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

async function startTransaction() {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  // Hàm xác nhận transaction
  async function commitTransaction() {
    return new Promise((resolve, reject) => {
      connection.commit((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  // Hàm quay lại transaction
  async function rollbackTransaction() {
    return new Promise((resolve, reject) => {
      connection.rollback(() => {
        resolve();
      });
    });
  }