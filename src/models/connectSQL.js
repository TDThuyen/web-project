import mysql2 from "mysql2";


// Tạo một pool kết nối
const pool = mysql2.createPool({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: 'quang', // Mật khẩu của cơ sở dữ liệu
    database: 'log', // Tên của cơ sở dữ liệu
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

// Lắng nghe sự kiện kết nối vào pool kết nối
pool.on('connection', connection => {
    console.log('Connected as id ' + connection.threadId);
    console.log('User: ' + connection.config.user); // In ra thông tin người dùng
});

// Export pool kết nối
export default pool;
