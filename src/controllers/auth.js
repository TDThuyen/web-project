import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../middlewares/JWT.js";
import connection from "../models/connectSQL.js";
import { signInValidator, singUpValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export const auth = async(req,res) => {
    if(req.body.submit==="Sign up"){
        //dang ki
        try {
            // buoc 1 validate du lieu
            const {error} = singUpValidator.validate(req.body, { abortEarly: false});
            if(error) {
                return res.status(404).json({
                    message: error
                })
            }
            // kiem tra nguoi dung da ton tai chua
            connection.query(`SELECT user_name from customers where user_name="${req.body.userName}"`, (error, results, fields) =>{
                const userExisted = results[0];
                if(userExisted){
                    return res.status(404).json({
                        message: "user name da ton tai!"
                    })
                }
            }) 

            connection.query(`SELECT phone from customers where phone="${req.body.phoneNumber}"`, (error, results, fields) =>{
                const userExisted = results[0];
                if(userExisted){
                    return res.status(404).json({
                        message: "so dien thoai da ton tai!"
                    })
                }
            }) 

            connection.query(`SELECT email from customers where email="${req.body.email}"`, (error, results, fields) =>{
                const userExisted = results[0];
                if(userExisted){
                    return res.status(404).json({
                        message: "email da ton tai!"
                    })
                }
            }) 
    
            const hashedPassword = await bcryptjs.hash(req.body.password, 11)
            
            connection.query(`Insert into customers(name,phone,email,birthday,pass_word,user_name) value("${req.body.fullname}","${req.body.phoneNumber}","${req.body.email}","${req.body.birthday}","${hashedPassword}","${req.body.userName}")`, (error, results, fields) => {
                if (error) {
                        console.error('Lỗi truy vấn: ' + error.stack);
                        return;
                        }
            })
            // buoc 5 thong bao dang ki thanh cong
            // xoa mat khau di
            req.body.password = undefined
            res.redirect('/auth/')
        } catch(error) {
            console.log(error.message)
        }
    }
    else {
        // dang nhap
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
            connection.query(`SELECT * from customers where user_name="${req.body.userName}"`, async (error, results, fields) =>{
                if(!results[0]){
                    return res.status(404).json({
                        message: "username khong ton tai"
                    })
                }
                const user = results[0];
                //Buoc3: kiem tra password
                const isMatch = await bcryptjs.compare(req.body.password,user.pass_word)
                if(!isMatch) {
                    return res.status(400).json({
                        message: "Mật khẩu không đúng!"
                    })
                }
                //Buoc4: Tao JWT
                let payload = {
                    id: user.customer_id,
                };
                const token = createJWT(payload);
                //Buoc6: tra ra thong bao cho nguoi dung
                req.session.user = { 
                    customer_id: user.customer_id, 
                    userName: user.user_name 
                };
                res.cookie("jwt",token,{maxAge: 1000*60*30}).cookie("name",user.name,{maxAge: 1000*60*30}).cookie("birthday",user.birthday,{maxAge: 1000*60*30}).cookie("phoneNumber",user.phone,{maxAge: 1000*60*30}).cookie("address",user.address,{maxAge: 1000*60*30});
                if(user.role === 1){
                    res.redirect("/home")
                }
                else {
                    res.redirect("/admin")
                }

            }) 
        } catch(error) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
}

