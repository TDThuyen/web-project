import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import { signInValidator, singUpValidator } from "../validation/user.js";

dotenv.config()
const {SECRET_CODE} = process.env.SECRET_CODE

export const signUp = async(req,res) => {
    try {
        // buoc 1 validate du lieu
        const {error} = singUpValidator.validate(req.body, { abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(404).json({
                // message: errors
                message: validateError
            })
        }
        // buoc 2 kiem tra userName co trung khong
        const userExists = await User.findOne({ userName: req.body.userName})
        if(userExists) {
            return res.status(404).json({
                message: "userName existed"
            })
        }

        const phoneExists = await User.findOne({ phoneNumber: req.body.phoneNumber})
        if(phoneExists) {
            return res.status(404).json({
                message: "phone number existed"
            })
        }
        // buoc 3 ma hoa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 11)
        // buoc 4 khoi tao user trong db
        const user = await User.create({
            ...req.body,
            password: hashedPassword 
        })
        // buoc 5 thong bao dang ki thanh cong
        // xoa mat khau di
        user.password = undefined
        return res.status(200).json({
            message: "Đăng kí account thành công!",
            user
        })
    } catch(error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

// dang nhap
export const signIn = async(req,res) => {
        try {
            //Buoc1: validate data tu phia client
            const {error} = signInValidator.validate(req.body, {abortEarly:false})
            if(error) {
                const errors = error.details.map(err => err.message)
                return res.status(404).json({
                    message: errors
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
            // const accesToken = jwt.sign({_id: user._id, SECRET_CODE})
            //Buoc6: tra ra thong bao cho nguoi dung
            return res.status(200).json({
                message: "Đăng nhập thành công!",
                user,
                // accesToken
            })
        } catch(error) {
            return res.status(500).json({
                name: error.name,
                message: error.message,
            })
        }
    }