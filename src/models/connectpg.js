import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "5ang15122003",
    database: "web"
});

client.connect();

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

