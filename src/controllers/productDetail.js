import Evaluate from "../models/Evaluate.js";
import connection from "../models/connectSQL.js";

export default async(req,res) =>{
    try{
        console.log(req.body)
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
        if(req.body.submit === "them-gio-hang"){
            console.log(req.body)
            connection.query(`INSERT INTO cart(customer_id,id_prod,total_amout,quantity) value("${await getUserID(req)}","${req.body.id_prod}","${req.body.price}","${req.body.quantity}"))`, async (error, results, fields) =>{
                
            })
        }
    } catch(error){
        console.log(error)
    }
}

async function getUserID(req){
    if(req.sessionID&&req.session.user){
        const user = JSON.parse(await redisClient.get("sess:"+req.sessionID))
        return user?.user_id
    }
    else {
        return -1;
    }
}
