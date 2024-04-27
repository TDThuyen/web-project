import redisClient from "../models/connectRedis.js";
import connection from "../models/connectSQL.js";

export const home = async(req,res) => {
    if(req.body.submit === "log_out"){
        try {
            res.clearCookie("jwt");
            res.clearCookie("user_name");
            res.clearCookie("name");
            res.clearCookie("phoneNumber");
            res.clearCookie("address");
            res.clearCookie("birthday");
            req.session.destroy();
            res.redirect("/auth");
        } catch(error){
            console.log(error);
        }
    }
    if(req.body.submit === "Cập nhật"){
        try {
            console.log(req.file)
            // sửa dữ liệu trong database
            connection.query(`UPDATE customers set name = "${req.body.fullname}", birthday = "${req.body.birthday}", phone = "${req.body.phoneNumber}", address = "${req.body.address}"
              where user_name="${await getUserName(req)}"`, async (error, results, fields) =>{
                res.clearCookie("name");
                res.clearCookie("phoneNumber");
                res.clearCookie("address");
                res.clearCookie("birthday");
                res.cookie("name",req.body.fullname).cookie("birthday",req.body.birthday).cookie("phoneNumber",req.body.phoneNumber).cookie("address",req.body.address);
                res.redirect("/home")
            }) 
        } catch(error){
            console.log(error);
        }
    }
}

async function getUserName(req){
    if(req.sessionID&&req.session.user){
        const user = JSON.parse(await redisClient.get("sess:"+req.sessionID))
        return user?.user.userName
    }
    else {
        return "-1";
    }
}