import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../middlewares/JWT.js";
import Evaluate from "../models/Evaluate.js";
import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";
import { signInValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export default async(req,res) =>{
    try{
        // comment
        if(req.body.submit === "Login"){
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
                res.cookie("status","login")
                if(user.role === 1){
                    res.render("productDetail.html")
                }
                else {
                    res.redirect("/admin")
                }
            })
        }
        if(req.body.submit === "comment"){
            const commented = await Evaluate.findOne({
                customer_id: await getUserID(req),
                product_id: req.body.product_id
            })
            if(!commented){
                const comment = await Evaluate.create({
                    product_id: req.body.product_id,
                    customer_id: await getUserID(req),
                    rate: req.body.rate,
                    comment: req.body.comment,
                    date_posted: new Date()
                });
                if (!comment) {
                    return res.status(404).json({
                        message: "comment khong thanh cong"
                    })
                }
            }
            else {
                evaluate.updateOne({customer_id: req.body.customer_id,
                    product_id: req.body.product_id}, {$set: {product_id: req.body.product_id,
                    customer_id: JSON.parse(await redisClient.get("sess:"+req.sessionID)).customer_id,
                    rate: req.body.rate,
                    comment: req.body.comment,
                    date_posted: new Date()}}, function (err,res) {
                    if (err) throw err;
                    console.log('update success: ' + res.result.nModified + ' record');
                });
            }
        }
        if(req.body.picked__product__name) {;
            connection.query(`select id_prod,product_detail.product_id from product_detail inner join products
            on product_detail.product_id = products.product_id
            where products.product_name = "${req.body.picked__product__name}" and product_detail.color=${req.body.picked__product__color}`, async (error, results, fields) =>{
                if(results) {
                    const id_prod = results[0].id_prod;
                    const product_id = results[0].product_id
                    connection.query(`INSERT INTO cart(customer_id,id_prod,total_amout,quantity,product_id) value("${req.session.user.customer_id}","${id_prod}","${req.body.total__amount}","${req.body.quantity}",${product_id})`, async (error, results, fields) =>{
                        if (error) {
                            console.error("Error :", error);
                            return;
                        } 
                    })
                }
                if (error) {
                    console.error("Error :", error);
                    return;
                } 
            })
            // res.redirect(`id=${req.params.id}`);
            res.cookie("status","ok");
            res.render("productDetail.html")
        }
    } catch(error){
        res.cookie("status","notok")
        console.log(error)
    }
}

