import dotenv from "dotenv";
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE

export const checkPermisson = (req,res,next) => {
    try {
        // buoc 1: nguoi dung dang nhap hay chua
        // let token = null;
        // if(req.session.user){
        //     token = req.cookies.jwt;
        // }
        // // buoc 2: kiem tra token
        // if(!token || isTokenExpired(token)){
        //     res.redirect("/auth/")
        // }
        if(!req.session||!req.session.user){
            res.redirect("/auth/")
        }
        else{
            
            
        // // buoc 3: kiem tra quyen nguoi dung
        //     const token = req.cookies.jwt
        //     if(!token || isTokenExpired(token)){
        //             return res.status(404).json({
        //                 message: "loi token"
        //             })
        //         }
        //     const decoded = verifyToken(token);
        //     connection.query(`SELECT * from customers where id = ${decoded}`, (error, results, fields) => {
        //         if (results) {
        //             return res.status(404).json({
        //                 message: "loi user"
        //             })
        //         }
        //     })
        }
        next();
    } catch (error) {
        console.log(error)
    }
}