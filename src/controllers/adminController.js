import connection from "../models/connectSQL.js";
export const postCreateUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let birthday = req.body.birthday;
    let role = req.body.role;
    let password = req.body.password;
    let username = req.body.username;
    let userimage = req.body.userimage;

    connection.query(
        `insert into customers(name , email, phone , address, birthday, role , pass_word , user_name, user_img)
               VALUES(? ,? , ? , ?, ?, ? , ? , ?, ?)`,
        [name, email, phone, address, birthday, role, password, username, userimage],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
            // Tùy chọn bạn có thể gửi phản hồi thành công tại đây
        }
    );
    res.redirect("/admin/UserManagement")
};

// hien thi danh sach nguoi dung
export const getUser = (req, res) => {
    connection.query(
        `SELECT * FROM customers`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            console.log(results);
            res.render("UserManagement.ejs", { listUser: results });
        }
    );
};


// update user 
export const getUpdateUser = (req, res) => {
    const userId = req.params.id
    connection.query(
        'SELECT * from customers where customer_id = ?',
        [userId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            // console.log(">>> results", results);
            // Truyền vào đối tượng đầu tiên trong mảng kết quả
            res.render("edit.ejs", { user: results[0] });
            // console.log(user)
        }
    );
};


export const postUpdateUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let birthday = new Date(req.body.birthday);
    birthday = `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`;
    let role = req.body.role;
    let password = req.body.password;
    let username = req.body.username;
    let userimage = req.body.userimage;
    let userId = req.body.userId

    connection.query(
        `update customers 
        set name = ?, email = ?, phone = ? , address = ? , birthday = ? , role = ?, pass_word = ? , user_name = ? , user_img = ?
        where customer_id = ?`,
        [name, email, phone, address, birthday, role, password, username, userimage, userId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
        }
    );
    res.redirect('/admin/UserManagement')
}

// delete user hien thi 
export const postDeleteUser = (req, res) => {
    const userId = req.params.id
    connection.query(
        'SELECT * from customers where customer_id = ?',
        [userId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            console.log(">>> results", results);
            // Truyền vào đối tượng đầu tiên trong mảng kết quả
            res.render("delete.ejs", { user: results[0] });
            // console.log(user)
        }
    );
}

// delete user database 
export const postDestroyMessage = (req, res) => {
    const id = req.body.userId // lay id trong form id cua nguoi can xoa 
    connection.query(
        `delete from customers where customer_id = ?`,
        [id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
        }
    )
    // res.redirect('/admin/UserManagement')
    res.redirect('/admin/UserManagement')
    // console.log(userId)
}

// them san pham 
export const addProduct = (req, res) => {
    let product_name = req.body.product_name;
    let description = req.body.description;
    let quantity_stock = req.body.quantity_stock;
    let id_port = req.body.id_port;
    let price = req.body.price;
    let img_top = req.body.img_top;
    let ing_mid = req.body.ing_mid;
    let img_bot = req.body.img_bot;
    // let userimage = req.body.userimage;
    connection.query(
        `insert into products(product_name ,description , quantity_stock , id_port, price, img_top , ing_mid , img_bot)
               VALUES(? ,? , ? , ?, ?, ? , ? , ?)`,
        [product_name, description, quantity_stock, id_port, price, img_top, ing_mid, img_bot],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
            // Tùy chọn bạn có thể gửi phản hồi thành công tại đây
        }
    );
    res.redirect("/admin/ProductManagement")
}

export const getProduct = (req, res) => {
    connection.query(
        `SELECT * FROM products`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            // console.log(results);
            res.render("ProductManagement.ejs", { listProducts: results });
        }
    );
};

// do thong tin san pham vao trong edit : 
export const getProductUpdate = (req, res) => {
    const productId = req.params.id
    connection.query(
        'SELECT * from products where product_id = ?',
        [productId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            // console.log(">>> results", results);
            // Truyền vào đối tượng đầu tiên trong mảng kết quả
            res.render("editProduct.ejs", { product: results[0] });
            // console.log(user)
        }
    );
}

export const postUpdateProduct = (req, res) => {
    let product_name = req.body.product_name;
    let description = req.body.description;
    let quantity_stock = req.body.quantity_stock;
    let id_port = req.body.id_port;
    let price = req.body.price;
    let img_top = req.body.img_top;
    let ing_mid = req.body.ing_mid;
    let img_bot = req.body.img_bot;
    let productId = req.body.productId;

    connection.query(
        `update products 
        set product_name = ?, description = ?, quantity_stock = ? , id_port = ? , price = ? , img_top = ?, ing_mid = ? , img_bot = ?
        where product_id = ?`,
        [product_name, description, quantity_stock, id_port, price, img_top, ing_mid, img_bot, productId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
        }
    );
    res.redirect('/admin/ProductManagement')
}

// confirm delete product : 
export const postDeleteProduct = (req, res) => {
    const productId = req.params.id
    connection.query(
        'SELECT * from products where product_id = ?',
        [productId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
            console.log(">>> results", results);
            // Truyền vào đối tượng đầu tiên trong mảng kết quả
            res.render("deleteProduct.ejs", { product: results[0] });
            // console.log(user)
        }
    );
}

// delete product
export const deleteProduct = (req, res) => {
    const id = req.body.productId // lay id trong form id cua nguoi can xoa 
    connection.query(
        `delete from products where product_id = ?`,
        [id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy khách hàng');
            }
        }
    )
    res.redirect('/admin/ProductManagement')
}