import dotenv from "dotenv";
import User from "../models/User.js";
import { isTokenExpired, verifyToken } from "./JWT.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export const checkAccessed = async (req,res,next) => {
    try{
        let token = null;
        if(req.headers?.cookie){
            token = req.headers.cookie.match(/jwt=([^;]+)/)[1];
            if(token && !isTokenExpired(token)){
                // kiem nguoi dung
                const decoded = verifyToken(token);
                const user = await User.findById(decoded._id);
                if (!user) {
                    next();
                }
                res.redirect("/home")
            }
        }
        next();
    } catch(error){
        console.log(error)
    }
}