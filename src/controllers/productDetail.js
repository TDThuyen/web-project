import Evaluate from "../models/Evaluate.js";
import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";


export default async(req,res) =>{
    try{
        // comment
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
        else {;
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
            res.redirect(`id=${req.params.id}`);
        }
    } catch(error){
        console.log(error)
    }
}

