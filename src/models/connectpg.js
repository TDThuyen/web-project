import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "27102004",
    database: "moho"
});

client.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối: ' + err.stack);
      return;
    }
  });

  export default client;

//test connect
//node src/models/connectpg.js
// client.query(`select * from portfolio`, (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
//     client.end();
// });

