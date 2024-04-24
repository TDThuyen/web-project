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
            
            // sửa dữ liệu trong database
            connection.query(`UPDATE customers set name = "${req.body.fullname}", birthday = "${req.body.birthday}", phone = "${req.body.phoneNumber}", address = "${req.body.address}"
              where user_name="${req.cookies.userName}"`, async (error, results, fields) =>{
                res.clearCookie("name");
                res.clearCookie("phoneNumber");
                res.clearCookie("address");
                res.clearCookie("birthday");
            }) 

            connection.query(`SELECT * from customers where user_name="${req.cookies.userName}"`, async (error, results, fields) =>{
                if(!results){
                    return res.status(404).json({
                        message: "user name khong ton tai!"
                    })
                }
                const user = results[0];
                res.cookie("name",user.name).cookie("birthday",user.birthday).cookie("phoneNumber",user.phone).cookie("address",user.address);
                res.redirect("/home")
            })

        } catch(error){
            console.log(error);
        }
    }
}