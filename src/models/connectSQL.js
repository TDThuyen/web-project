import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
<<<<<<< HEAD
    password: '5ang15122003', // Mật khẩu của cơ sở dữ liệu
    database: 'web' // Tên của cơ sở dữ liệu

=======
    password: 'Ducquangk6@', // Mật khẩu của cơ sở dữ liệu
    database: 'web' // Tên của cơ sở dữ liệu
>>>>>>> f4e014250383958dfcd55ae6afa988a200729754
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
  