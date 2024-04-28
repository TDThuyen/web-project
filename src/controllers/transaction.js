import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    await startTransaction();
    connection.query(`select * from cart where customer_id = ${req.session.user.customer_id}`, async (error, results, fields) =>{
        if (error) {
            console.error("Error fetching cart:", error);
            return;
        }
        let total__amount = 0;
        for (let i = 0; i < results.length; i++) {
            const cartItem = results[i];
            // Lấy thông tin sản phẩm từ cartItem
            const id_prod = cartItem.id_prod;
            const quantity = cartItem.quantity;
            total__amount = total__amount + cartItem.total_amout;
    
            // Thực hiện truy vấn để cập nhật thông tin sản phẩm
            connection.query(`UPDATE product_detail SET quantity_of_color = quantity_of_color - ${quantity} WHERE id_prod = ${id_prod}`, (error, results, fields) => {
                if (error) {
                    console.error("Error :", error);
                    return;
                }
            });
        }

        connection.query(`insert into orders(customer_id,order_date,total_amount) value (${req.session.user.customer_id},"${new Date()}",${total__amount})`, (error, results, fields) => {
            if (error) {
                console.error("Error :", error);
                return;
            } 
            const order_id = results.insertId;
            connection.query(`insert into orderdetail(order_id,quantity,total_amout,id_prod,product_id) 
            select ${order_id},quantity,total_amout,id_prod,product_id from cart where customer_id = ${req.session.user.customer_id}`), (error,results,fields) => {
                if (error) {
                    console.error("Error :", error);
                    return;
                } 
            }
        });
        //xoa cart
        connection.query(`DELETE FROM cart WHERE customer_id = ${req.session.user.customer_id}`)
    })
    await commitTransaction();
    res.json("success")
    console.log('Transaction completed successfully.');
  } catch(error){
    await rollbackTransaction();
        console.error('Transaction failed:', error);
    } 
};

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