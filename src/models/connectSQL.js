import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
<<<<<<< HEAD
    password: '5ang15122003', // Mật khẩu của cơ sở dữ liệu
=======
    password: 'Ducquangk6@', // Mật khẩu của cơ sở dữ liệu
>>>>>>> 2f6ec1e7ed6566ed4cfc122540bbdb28bd96a97e
    database: 'web' // Tên của cơ sở dữ liệu
  });
  
  // Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối: ' + err.stack);
      return;
    }
  });

  export default connection;
  
  // // Thực thi truy vấn SQL
  // connection.query('SELECT * FROM table_name', (error, results, fields) => {
  //   if (error) {
  //     console.error('Lỗi truy vấn: ' + error.stack);
  //     return;
  //   }
  
  //   console.log('Dữ liệu từ cơ sở dữ liệu: ', results);
  // });
  