import mysql from "mysql2";

const connection = mysql.createConnection({
  host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
  port: 3306,
  user: 'root', // Tên người dùng của cơ sở dữ liệu
  password: '27102004', // Mật khẩu của cơ sở dữ liệu
  database: 'moho' // Tên của cơ sở dữ liệu

});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }
});

export default connection;
