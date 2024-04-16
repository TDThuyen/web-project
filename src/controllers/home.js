export const home = async(req,res) => {
    if(req.body.submit === "log_out"){
        try {
            res.clearCookie("jwt");
            res.clearCookie("user_name");
            res.redirect("/auth");
        } catch(error){
            console.log(error);
        }
    }
}