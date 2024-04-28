import dotenv from "dotenv";
import { createClient } from 'redis';
dotenv.config();

const redisClient= createClient({
    host: 'redis-12227.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com', // Tên máy chủ Redis
    port: 6379, // Cổng máy chủ Redis
});

export default redisClient
