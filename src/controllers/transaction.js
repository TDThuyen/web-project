import connection from "../models/connectSQL.js";

// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    await startTransaction();
    connection.query(`select * from cart where customer_id = ${req.session.user.customer_id}`, async (error, results, fields) => {
      if (error) {
        console.error('đặt hàng thất bại:', error);
        await rollbackTransaction();
        res.json("đặt hàng thất bại");
        return;
      }
      let totalAmount = 0;
      for (let i = 0; i < results.length; i++) {
        const cartItem = results[i];
        // Lấy thông tin sản phẩm từ cartItem
        totalAmount += parseFloat(cartItem.total_amout);
      }
      connection.query(`insert into orders(customer_id,order_date,total_amount) values (${req.session.user.customer_id}, NOW(), ${totalAmount})`, async (error, results, fields) => {
        if (error) {
          console.error('đặt hàng thất bại:', error);
          await rollbackTransaction();
          res.json("đặt hàng thất bại");
          return;
        }
        const orderId = results.insertId;
        connection.query(`insert into orderdetail(order_id,quantity,total_amout,id_prod,product_id) 
            select ${orderId},quantity,total_amout,id_prod,product_id from cart where customer_id = ${req.session.user.customer_id}`, async (error, results, fields) => {
          if (error) {
            console.error('đặt hàng thất bại:', error);
            await rollbackTransaction();
            res.json("đặt hàng thất bại");
            return;
          }
        });

        // Xóa giỏ hàng
        connection.query(`DELETE FROM cart WHERE customer_id = ${req.session.user.customer_id}`, async (error, results, fields) => {
          if (error) {
            console.error('đặt hàng thất bại:', error);
            await rollbackTransaction();
            res.json("đặt hàng thất bại");
            return;
          }
        });

        await commitTransaction();
        res.json("đặt hàng thành công!");
      });
    });
  } catch (error) {
    console.error('đặt hàng thất bại:', error);
    await rollbackTransaction();
    res.json("đặt hàng thất bại");
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

// Hàm xác nhận giao dịch
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

// Hàm quay lại giao dịch
async function rollbackTransaction() {
  return new Promise((resolve, reject) => {
    connection.rollback(() => {
      resolve();
    });
  });
}