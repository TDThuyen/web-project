import dotenv from "dotenv";
import User from "../models/User.js";
import { isTokenExpired, verifyToken } from "./JWT.js";
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE


export const checkPermisson = async (req,res,next) => {
    try {
        // buoc 1: nguoi dung dang nhap hay chua
        let token = null;
        if(req.headers.cookie){
            token = req.headers.cookie.match(/jwt=([^;]+)/)[1];
        }
        // buoc 2: kiem tra token
        if(!token || isTokenExpired(token)){
            res.redirect("/auth/")
        }

        // buoc 3: kiem tra quyen nguoi dung
        const decoded = verifyToken(token);
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log("loi user")
        }

        // if(user.role !== "admin"){
        //     return res.status(403).json({
        //         message: "bạn không có quyền này!"
        //     })
        // }

        // buoc 4: next
        next();
    } catch (error) {
        console.log(error)
    }
}