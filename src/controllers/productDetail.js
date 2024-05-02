import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../middlewares/JWT.js";
import evaluate from "../models/Evaluate.js";
import { default as connection } from "../models/SQLConnection.js";
import rateAVG from "../models/rateAVG.js";
import { signInValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

export default async (req, res) => {
    console.log(req.body)
    try {
        // comment
        if (req.body.submit === "Login") {
            const { error } = signInValidator.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map(err => err.message)
                return res.status(404).json({
                    message: "nhập không đúng!"
                })
            }
            //Buoc2: kiem tra userName da ton tai hay chua
            connection.query(`SELECT * from customers where user_name="${req.body.userName}"`, async (error, results, fields) => {
                if (!results[0]) {
                    return res.status(404).json({
                        message: "username khong ton tai"
                    })
                }
                const user = results[0];
                //Buoc3: kiem tra password
                const isMatch = await bcryptjs.compare(req.body.password, user.pass_word)
                if (!isMatch) {
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
                res.cookie("jwt", token, { maxAge: 1000 * 60 * 30 }).cookie("name", user.name, { maxAge: 1000 * 60 * 30 }).cookie("birthday", user.birthday, { maxAge: 1000 * 60 * 30 }).cookie("phoneNumber", user.phone, { maxAge: 1000 * 60 * 30 }).cookie("address", user.address, { maxAge: 1000 * 60 * 30 });
                res.cookie("status", "login")
                if (user.role === 1) {
                    res.render("productDetail.html")
                }
                else {
                    res.redirect("/admin")
                }
            })
        }
        else if (req.body.comment__textt) {
            const commented = await evaluate.findOne({
                customer_id: parseInt(req.session.user.customer_id),
                product_id: parseInt(req.params.id)
            })
            if (!commented) {
                const comment = await evaluate.create({
                    product_id: parseInt(req.params.id),
                    customer_name: req.cookies.name,
                    customer_id: parseInt(req.session.user.customer_id),
                    rate: parseInt(req.body.rating),
                    comment: req.body.comment__textt,
                    date_posted: new Date()
                });
                if (!comment) {
                    return res.status(404).json({
                        message: "comment khong thanh cong"
                    })
                }
            }
            else {
                evaluate.findOneAndUpdate({
                    customer_id: parseInt(req.session.user.customer_id),
                    product_id: parseInt(req.params.id)
                }, {
                    rate: parseInt(req.body.rating),
                    comment: req.body.comment__textt,
                    date_posted: new Date()
                }, { new: true }).then(updatedProduct => {
                    if (!updatedProduct) {
                        console.log("Không tìm thấy sản phẩm để cập nhật");
                        // Xử lý trường hợp không tìm thấy sản phẩm
                    } else {
                        console.log("Sản phẩm đã được cập nhật:", updatedProduct);
                        // Xử lý kết quả sau khi cập nhật thành công
                    }
                });
            }
            const avgRate = await rateAVG.findOne({
                product_id: parseInt(req.params.id)
            })
            if (!avgRate) {
                rateAVG.create({
                    product_id: parseInt(req.params.id),
                    rate_sum: parseInt(req.body.rating),
                    user_sum: parseInt(1)
                })
            }
            else {
                const updateData = {
                    product_id: parseInt(avgRate.product_id),
                    rate_sum: parseInt(parseInt(avgRate.rate_sum) + parseInt(req.body.rating)),
                    user_sum: parseInt(parseInt(avgRate.user_sum) + parseInt(1))
                }
                rateAVG.findOneAndUpdate(
                    { product_id: parseInt(req.params.id) },
                    updateData, // Dữ liệu mới cần cập nhật
                    { new: true } // Tùy chọn để trả về bản ghi đã cập nhật thay vì bản ghi gốc
                )
                    .then(updatedProduct => {
                        if (!updatedProduct) {
                            console.log("Không tìm thấy sản phẩm để cập nhật");
                            // Xử lý trường hợp không tìm thấy sản phẩm
                        } else {
                            console.log("Sản phẩm đã được cập nhật:", updatedProduct);
                            // Xử lý kết quả sau khi cập nhật thành công
                        }
                    });
            }
            res.render("productDetail.html")
        }
        else if (req.body.submit === "addCart" && req.body.picked__productDetail__id !== 'undefined') {
            // connection.query(`update cart set total_amount = total_amount + ${req.body.total__amount}, quantity = quantity + ${req.body.quantity} where product_detail_id = ${req.body.picked__productDetail__id} and customer_id = ${req.session.user.customer_id}`, async (error, results, fields) => {
            //     if (results.affectedRows > 0) {
            //         res.cookie("status", "ok")
            //         return res.render("productDetail.html")
            //     }
            // })
            connection.query(`INSERT INTO cart(customer_id,product_detail_id,total_amount,quantity,product_id) value("${req.session.user.customer_id}","${req.body.picked__productDetail__id}","${req.body.total__amount}","${req.body.quantity}",${req.params.id})`, async (error, results, fields) => {
                if (error) {
                    console.error("Error :", error);
                    res.cookie("status", "notok")
                    res.render("productDetail.html")
                }
                else {
                    res.cookie("status", "ok")
                    res.render("productDetail.html")
                }
            })
        }
        else if (req.body.submit === "buy" && req.body.picked__productDetail__id !== 'undefined') {
            connection.query(`update cart set total_amount = total_amount + ${req.body.total__amount}, quantity = quantity + ${req.body.quantity} where product_detail_id = ${req.body.picked__productDetail__id} and customer_id = ${req.session.user.customer_id}`, async (error, results, fields) => {
                if (results?.affectedRows === 0) {
                    connection.query(`select product_detail_id,product_detail.product_id from product_detail inner join products
                    on product_detail.product_id = products.product_id
                    where product_detail.product_detail_id = ${eq.body.picked__productDetail__id}`, async (error, results, fields) => {
                        if (results) {
                            const product_detail_id = results[0].product_detail_id;
                            const product_id = results[0].product_id
                            connection.query(`INSERT INTO cart(customer_id,product_detail_id,total_amount,quantity,product_id) value("${req.session.user.customer_id}","${product_detail_id}","${req.body.total__amount}","${req.body.quantity}",${product_id})`, async (error, results, fields) => {
                                if (error) {
                                    console.error("Error :", error);
                                    res.cookie("status", "notok")
                                    return
                                }
                            })
                        }
                        if (error) {
                            res.cookie("status", "notok")
                            res.cookie("status", "notok")
                            return
                        }
                    })
                }
                res.redirect("/cart")
            })
        }
        else {
            res.render("productDetail.html")
        }
    } catch (error) {
        console.log(error)
    }
}

