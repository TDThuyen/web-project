
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import configViewEngine from "./config/viewEngine.js";
import corMw from "./middlewares/cors.js";
import Session from "./middlewares/session.js";
import redisClient from "./models/connectRedis.js";
import router from "./router/index.js";
const app = express();

configViewEngine(app);

app.use(express.urlencoded({extended: false}))

config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB
app.use(json())
app.use(cookieParser())
app.set('trust proxy',1)

app.use(Session)

app.options('*',corMw);

await redisClient.connect()

connect(MONGO_DB)
    .then(() => {
        console.log('Connect database sucess')
    })
    .catch((er) => {
        console.log(er)
    })

app.use(router)

app.use((req,res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
})


redisClient.flushAll();



// import { config } from "dotenv";
// import express, { json } from "express";
// import configViewEngine from "./config/viewEngine.js";
// import connection from "./models/connectSQL.js";

// const app = express();

// configViewEngine(app);

// app.use(express.urlencoded({extended: false}))

// config();

// const PORT = process.env.PORT;

// app.use(json())

// // do stuff
// // await redisClient.disconnect()

// // connect(URI_DB)
// try{
// connection.query(`CREATE TABLE customers (
//     "customer_id" int NOT NULL AUTO_INCREMENT,
//     "name" varchar(100) NOT NULL,
//     "email" varchar(100) NOT NULL,
//     "phone" varchar(20) NOT NULL,
//     "address" varchar(255) DEFAULT NULL,
//     "birthday" DATE NOT NULL,
//     "role" int DEFAULT 1,
//     "pass_word" varchar(500) NOT NULL,
//     "user_name" varchar(50) NOT NULL,
//     "user_img" varchar(50) DEFAULT NULL,
//     PRIMARY KEY ("customer_id")
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`, async (error, results, fields) =>{
    

// }) 
// } catch(error) {
// console.log(error)
// }


// app.use((req,res) => {
//     return res.send("404 not found")
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on post ${PORT}`);
// })


