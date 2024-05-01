import connection from "../models/connectSQL.js";
import SQLConnect from "../models/SQLConnection.js";
// Route để lấy các sản phẩm cho một trang cụ thể
export default async (req, res) => {
  try {
    if(req.body.delete__cart__id){
      connection.query(`delete from cart where cart_id = ${req.body.delete__cart__id} and customer_id = ${req.session.user.customer_id}`,async (error, results, fields) =>{
        if(results){
          
        }
      })
    }
    else{
      connection.query(`call process_order_from_cart(${req.session.user.customer_id})`,async (error, results, fields) =>{
        if(!results){
          res.cookie("status","notok")
          res.render("test.html")
          console.log(error)
        }
        else {
          res.cookie("status","ok")
          res.render("test.html")
        }
      })
    }
    } catch (error) {
    console.error(error);
  }
};

async function startTransaction() {
  return new Promise((resolve, reject) => {
    SQLConnect.beginTransaction((err) => {
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
    SQLConnect.commit((err) => {
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
    SQLConnect.rollback(() => {
      resolve();
    });
  });
}