import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'my_user', // Tên người dùng của cơ sở dữ liệu
    password: 'strong_password', // Mật khẩu của cơ sở dữ liệu
    database: 'project' // Tên của cơ sở dữ liệu
});
  
// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối: ' + err.stack);
        return;
    }
});

export default connection;





