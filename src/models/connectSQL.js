import mysql from "mysql2";

const connection = mysql.createPool({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: 'Ducquangk6@', // Mật khẩu của cơ sở dữ liệu
    database: 'web' ,// Tên của cơ sở dữ liệu
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
  