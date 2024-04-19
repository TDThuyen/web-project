import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3307,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
<<<<<<< HEAD
    password: '123456', // Mật khẩu của cơ sở dữ liệu
    database: 'quangdeptrai' // Tên của cơ sở dữ liệu
=======
    password: '5ang15122003', // Mật khẩu của cơ sở dữ liệu
    database: 'web' // Tên của cơ sở dữ liệu
>>>>>>> b9308af3bbdb069b47bff1ec73a9d087069016b5
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
  