import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'root', // Địa chỉ của máy chủ cơ sở dữ liệu
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: 'Ducquangk6@', // Mật khẩu của cơ sở dữ liệu
    database: 'test' // Tên của cơ sở dữ liệu
  });
  
  // Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối: ' + err.stack);
      return;
    }
  
    console.log('Kết nối thành công với cơ sở dữ liệu!');
  });

  export default connection;
  
//   // Thực thi truy vấn SQL
//   connection.query('SELECT * FROM table_name', (error, results, fields) => {
//     if (error) {
//       console.error('Lỗi truy vấn: ' + error.stack);
//       return;
//     }
  
//     console.log('Dữ liệu từ cơ sở dữ liệu: ', results);
//   });
  
//   // Đóng kết nối sau khi sử dụng
//   connection.end();