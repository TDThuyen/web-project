import mysql from "mysql2";

// Tạo một connection mới
const SQLConnection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: '5ang15122003', // Mật khẩu của cơ sở dữ liệu
    database: 'web' // Tên của cơ sở dữ liệu
});

export default SQLConnection
