import dotenv from "dotenv";
import connection from "../models/connectSQL.js";
import { isTokenExpired, verifyToken } from "./JWT.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export const checkAccessed = async (req,res,next) => {
    try{
        let token = null;
        if(req.headers?.cookie){
            token = req.headers.cookie.match(/jwt=([^;]+)/)[1];
            if(token && !isTokenExpired(token)){
                // kiem tra nguoi dung
                const decoded = verifyToken(token);
                connection.query(`SELECT * from customers where id = ${decoded}`, (error, results, fields) => {
                    if (results) {
                        return res.status(404).json({
                            message: "loi user"
                        })
                    }
                })
            }
        }
        next();
    } catch(error){
        console.log(error)
    }
}