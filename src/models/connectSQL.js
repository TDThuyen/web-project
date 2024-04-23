import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'my_user',
    password: 'strong_password',
    database: 'project'
});
connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối: ' + err.stack);
        return;
    }
});

export default connection;





