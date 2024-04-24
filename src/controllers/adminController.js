import connection from "../models/connectSQL.js";


const postCreateUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let birthday = req.body.birthday;
    let role = req.body.role;
    let password = req.body.password;
    let username = req.body.username;
    let userimage = req.body.userimage;
    console.log(">>> req.body", name, email, phone, address, birthday, role, password, username, userimage)
    res.send('create user')
    connection.query(
        `insert into customers(name , email, phone , address, birthday, role , pass_word , user_name, user_img)
        VALUES(? ,? , ? , ?, ?, ? , ? , ?, ?)`,
        [name, email, phone, address, birthday, role, password, username, userimage],
        function (err, results) {
            console.log(results)
            console.log("create success")
        }
    )

}

export default postCreateUser;