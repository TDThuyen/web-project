import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../middlewares/JWT.js";
import User from "../models/User.js";
import { signInValidator, singUpValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export const auth = async(req,res) => {
    if(req.body.submit==="Sign up"){
        //dang ki
        try {
            // buoc 1 validate du lieu
            const {error} = singUpValidator.validate(req.body, { abortEarly: false});
            console.log(error)
            if(error) {
                return res.status(404).json({
                    message: "nhập không đúng!"
                })
            }
            // buoc 2 kiem tra userName co trung khong
            const userExists = await User.findOne({ userName: req.body.userName})
            if(userExists) {
                return res.status(404).json({
                    message: "username đã tồn tại"
                })
            }
    
            const phoneExists = await User.findOne({ phoneNumber: req.body.phoneNumber})
            if(phoneExists) {
                return res.status(404).json({
                    message: "số điện thoại đã tồn tại"
                })
            }
            //buoc 3 ma hoa password
            const hashedPassword = await bcryptjs.hash(req.body.password, 11)
            // buoc 4 khoi tao user trong db
            const user = await User.create({
                ...req.body,
                password: hashedPassword 
            })
            // connection.query(`Insert into users values("${req.userName}","${hashedPassword}","${req.phoneNumber}")`, (error, results, fields) => {
            //     if (error) {
            //             console.error('Lỗi truy vấn: ' + error.stack);
            //             return;
            //             }
                    
            //         console.log('Dữ liệu từ cơ sở dữ liệu: ', results);
            // })
            // buoc 5 thong bao dang ki thanh cong
            // xoa mat khau di
            user.password = undefined
            res.redirect('/auth/')
        } catch(error) {
            console.log(error.message)
        }
    }
    else {
        try {
            //Buoc1: validate data tu phia client
            const {error} = signInValidator.validate(req.body, {abortEarly:false})
            if(error) {
                const errors = error.details.map(err => err.message)
                return res.status(404).json({
                    message: "nhập không đúng!"
                })
            }
            //Buoc2: kiem tra userName da ton tai hay chua
            const user = await User.findOne({userName: req.body.userName})
            if(!user) {
                return res.status(404).json({
                    message: "userName không tồn tại"
                })
            }
            //Buoc3: kiem tra password
            const isMatch = await bcryptjs.compare(req.body.password, user.password)
            if(!isMatch) {
                return res.status(400).json({
                    message: "Mật khẩu không đúng!"
                })
            }
            //Buoc4: Tao JWT
            let payload = {
                _id: user._id,
            };
            const token = createJWT(payload);
            //Buoc6: tra ra thong bao cho nguoi dung
            res.cookie("jwt",token);
            res.cookie("user_name",user.userName);
            res.redirect("/home/")
            // return res.status(200).json({
            //     message: "Đăng nhập thành công!",
            //     user,
            //     // accesToken
            // })
        } catch(error) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
}
