import RedisStore from "connect-redis";
import session from "express-session";
import redisClient from "../models/connectRedis.js";
export default session({
    store: new RedisStore({ client: redisClient }),
    secret: 'quangdeptrai',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: { 
        secure: false ,
        httpOnly: true,
        maxAge: 1000*60*30
    } // Thiết lập cookie secure nếu sử dụng HTTPS
})