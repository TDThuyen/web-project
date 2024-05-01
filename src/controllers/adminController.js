import { connect } from "mongoose";
import connection from "../models/connectSQL.js";

import bcrypt from 'bcryptjs';
const saltRounds = 10;

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

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi khi mã hóa mật khẩu');
        }

        connection.query(
            `INSERT INTO customers(name, email, phone, address, birthday, role, pass_word, user_name, user_img)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, address, birthday, role, hash, username, userimage],
            function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Lỗi khi tạo người dùng');
                }
                console.log("Người dùng đã được tạo thành công");
                res.redirect("/admin/UserManagement")
            }
        );
    });
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
            // console.log(results);
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
            console.log(results[0].user_img)
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

// hien thi trong form delete user 
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
            // console.log(">>> results", results);
            // Truyền vào đối tượng đầu tiên trong mảng kết quả
            res.render("delete.ejs", { user: results[0] });
            // console.log(user)
        }
    );
}

// delete user database 
export const postDestroyMessage = (req, res) => {
    const id = req.body.userId // lay id trong form id cua nguoi can xoa 

    // Xóa các bản ghi liên quan trong bảng orderdetail trước
    connection.query(
        `DELETE FROM orderdetail WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = ?)`,
        [id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi xóa chi tiết đơn hàng');
            }

            // Sau khi xóa các bản ghi liên quan trong bảng orderdetail, tiếp tục xóa các bản ghi trong bảng orders
            connection.query(
                `DELETE FROM orders WHERE customer_id = ?`,
                [id],
                function (err, results) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Lỗi khi xóa đơn hàng');
                    }

                    // Sau khi xóa các bản ghi liên quan trong bảng orders, tiếp tục xóa người dùng
                    connection.query(
                        `DELETE FROM customers WHERE customer_id = ?`,
                        [id],
                        function (err, results) {
                            if (err) {
                                console.error(err);
                                return res.status(500).send('Lỗi khi xóa khách hàng');
                            }

                            // Chuyển hướng người dùng sau khi hoàn tất
                            res.redirect('/admin/UserManagement')
                        }
                    )
                }
            )
        }
    )
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
    let color = req.body.color;
    let quantity_of_color = req.body.quantity_of_color;

    // Kiểm tra xem sản phẩm đã tồn tại hay chưa
    connection.query(
        `SELECT * FROM products WHERE product_name = ?`,
        [product_name],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi kiểm tra sản phẩm');
            }

            if (results.length > 0) {
                // Sản phẩm đã tồn tại, kiểm tra xem chi tiết sản phẩm đã tồn tại hay chưa
                let product_id = results[0].product_id;
                connection.query(
                    `SELECT * FROM product_detail WHERE product_id = ? AND color = ?`,
                    [product_id, color],
                    function (err, results) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Lỗi khi kiểm tra chi tiết sản phẩm');
                        }

                        if (results.length == 0) {
                            // Chi tiết sản phẩm chưa tồn tại, thêm chi tiết sản phẩm
                            connection.query(
                                `INSERT INTO product_detail(product_id, color, quantity_of_color)
                                   VALUES(?, ?, ?)`,
                                [product_id, color, quantity_of_color],
                                function (err, results) {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).send('Lỗi khi thêm chi tiết sản phẩm');
                                    }
                                    console.log("Chi tiết sản phẩm đã được thêm thành công");
                                }
                            );
                        }
                    }
                );
            } else {
                quantity_stock = 0
                // Sản phẩm chưa tồn tại, thêm sản phẩm và chi tiết sản phẩm
                connection.query(
                    `INSERT INTO products(product_name ,description , quantity_stock , id_port, price, img_top , ing_mid)
                       VALUES(? ,? , ? , ?, ?, ? , ?)`,
                    [product_name, description, quantity_stock, id_port, price, img_top, ing_mid],
                    function (err, results) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Lỗi khi tạo sản phẩm');
                        }
                        console.log("Sản phẩm đã được tạo thành công");
                        let product_id = results.insertId; // Lấy product_id vừa được tạo

                        // Thêm vào bảng product_detail
                        connection.query(
                            `INSERT INTO product_detail(product_id, color, quantity_of_color)
                               VALUES(?, ?, ?)`,
                            [product_id, color, quantity_of_color],
                            function (err, results) {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).send('Lỗi khi thêm chi tiết sản phẩm');
                                }
                                console.log("Chi tiết sản phẩm đã được thêm thành công");
                            }
                        );
                    }
                );
            }
        }
    );

    res.redirect("/admin/ProductManagement")
}


////////////////////////////////////////////////////////////////////////////////////// SAN PHAM 
// lay thong tin toan bo san pham 
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


// lay thong tin trong product_detail : 
export const getProductDetails = (req, res) => {
    let product_id = req.params.id;

    connection.query(
        `SELECT * FROM product_detail WHERE product_id = ?`,
        [product_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy chi tiết sản phẩm');
            }
            // console.log(results)
            res.render("getProductDetails.ejs", { productDetails: results });
        }
    );
    // res.send("yes")
};


// do thong tin san pham vao trong edit : 
export const getProductUpdate = (req, res) => {
    const productId = req.params.id;
    const colorId = req.params.color_id;
    // console.log(productId, colorId)
    connection.query(
        'SELECT * from products where product_id = ?',
        [productId],
        function (err, productResults) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy sản phẩm');
            }

            connection.query(
                `SELECT * from product_detail where product_id = ? and color = ?`,
                [productId, colorId],
                function (err, detailResults) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Lỗi khi lấy chi tiết sản phẩm');
                    }

                    // Gửi cả thông tin sản phẩm và chi tiết sản phẩm tới view
                    if (productResults.length > 0) {
                        // Gửi cả thông tin sản phẩm và chi tiết sản phẩm tới view
                        res.render("addEditProduct.ejs", { x: productResults[0], details: detailResults[0] });
                    }
                }
            );
        }
    );
    // res.render('addEditProduct.ejs')
};


// update san pham 
export const postUpdateProduct = (req, res) => {
    let product_name = req.body.product_name;
    let description = req.body.description;
    let id_port = req.body.id_port;
    let price = req.body.price;
    let img_top = req.body.img_top;
    let ing_mid = req.body.ing_mid;
    let color = req.body.color;
    let quantity_of_color = req.body.quantity_of_color;
    let productId = req.body.productId;
    let oldColor = req.body.oldColor;
    connection.query(
        `update products 
        set product_name = ?, description = ?, id_port = ? , price = ? , img_top = ?, ing_mid = ?
        where product_id = ?`,
        [product_name, description, id_port, price, img_top, ing_mid, productId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi update products');
            }
            connection.query(
                `update product_detail
                set color = ?, quantity_of_color = ?
                where product_id = ? and color = ?`,
                [color, quantity_of_color, productId, oldColor],
                function (err, results1) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Lỗi khi update products');
                    }
                }
            )
        }
    );
    res.redirect('/admin/ProductManagement')
}

// confirm delete product (do thong tin san pham vao trong confirm de xoa)
export const postDeleteProduct = (req, res) => {
    const productId = req.params.id;
    const colorId = req.params.color_id;
    // console.log(productId, colorId)
    connection.query(
        'SELECT * from products where product_id = ?',
        [productId],
        function (err, productResults) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy sản phẩm');
            }

            connection.query(
                `SELECT * from product_detail where product_id = ? and color = ?`,
                [productId, colorId],
                function (err, detailResults) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Lỗi khi lấy chi tiết sản phẩm');
                    }

                    // Gửi cả thông tin sản phẩm và chi tiết sản phẩm tới view
                    if (productResults.length > 0) {
                        // Gửi cả thông tin sản phẩm và chi tiết sản phẩm tới view
                        res.render("deleteProduct.ejs", { x: productResults[0], details: detailResults[0] });
                    }
                }
            );
        }
    );
}

// delete product
export const deleteProduct = (req, res) => {
    const productId = req.body.productId; // lay id trong form id cua nguoi can xoa 
    const color = req.body.color; // lay color tu form

    // Dem so luong mau sac khac nhau cho san pham
    connection.query(
        `SELECT COUNT(DISTINCT color) as colorCount FROM product_detail WHERE product_id = ?`,
        [productId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
            }

            const colorCount = results[0].colorCount;

            if (colorCount <= 1) {
                // Neu chi con mot mau sac, xoa san pham khoi ca hai bang
                connection.query(
                    `DELETE FROM product_detail WHERE product_id = ?`,
                    [productId],
                    function (err, results) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Lỗi khi xóa sản phẩm');
                        }
                        connection.query(
                            `DELETE FROM products WHERE product_id = ?`,
                            [productId],
                            function (err, results2) {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).send('Lỗi khi xóa sản phẩm');
                                }
                                res.redirect('/admin/ProductManagement');
                            }
                        )
                    }
                );
            } else {
                // Neu con nhieu mau sac, chi xoa mau sac cu the tu bang product_detail
                connection.query(
                    `DELETE FROM product_detail WHERE product_id = ? AND color = ?`,
                    [productId, color],
                    function (err, results) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Lỗi khi xóa chi tiết sản phẩm');
                        }
                        res.redirect('/admin/ProductManagement');
                    }
                );
            }
        }
    );
};



//////////////////////////////////////////////////////////////////////// DAT HANG 

//PENDING
export const pendingProducts = (req, res) => {
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img 
        FROM orders 
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.status = 1
        ORDER BY orders.order_date DESC`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("pendingProducts.ejs", { listOrder: results });
        }
    );
}

// convert status 
export const convertPendingStatus = (req, res) => {

    let order_id = req.params.id;
    let status = req.body.status;
    connection.query(
        `update orders  
        set status = ?
        where order_id = ?`,
        [status, order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            // console.log("Người dùng đã được tạo thành công");
        }
    )
    res.redirect("/admin/orderManagement/pending")
}

// // CONFIRM
export const confirmedProducts = (req, res) => {
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.status = 2
        ORDER BY orders.order_date DESC`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(">>>> results", results);
            res.render("confirmedProducts.ejs", { confirmed: results });
        }
    );
}

export const convertConfirmedStatus = (req, res) => {

    let order_id = req.params.id;
    let status = req.body.status;
    // console.log(">>>>cau troi", order_id, "cau troi", status)
    connection.query(
        `update orders  
        set status = ?
        where order_id = ?`,
        [status, order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');

            }
            res.redirect("/admin/orderManagement/confirmed")
            // console.log("Người dùng đã được tạo thành công");
        }

    )

}

// DELIVERING
export const deliveringProducts = (req, res) => {
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.status = 3
        ORDER BY orders.order_date DESC`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("deliveringProducts.ejs", { listOrder: results });
        }
    );
}

export const convertDeliveringStatus = (req, res) => {

    let order_id = req.params.id;
    let status = req.body.status;
    connection.query(
        `update orders
        set status = ?
        where order_id = ?`,
        [status, order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
        }
    )
    res.redirect("/admin/orderManagement/delivering")
}

//DELIVERED
export const deliveredProducts = (req, res) => {
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.status = 4
        ORDER BY orders.order_date DESC`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("deliveringProducts.ejs", { listOrder: results });
        }
    );
}

export const convertDeliveredStatus = (req, res) => {

    let order_id = req.params.id;
    let status = req.body.status;
    connection.query(
        `update orders
        set status = ?
        where order_id = ?`,
        [status, order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
        }
    )
    res.redirect("/admin/orderManagement/delivered")
}

//CANCELLED
export const cancelledProducts = (req, res) => {
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.status = 5
        ORDER BY orders.order_date DESC`,
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("cancelledProducts.ejs", { listOrder: results });
        }
    );
}

export const convertCancelledStatus = (req, res) => {

    let order_id = req.params.id;
    let status = req.body.status;
    connection.query(
        `update orders
        set status = ?
        where order_id = ?`,
        [status, order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi tạo người dùng');
            }
            console.log("Người dùng đã được tạo thành công");
        }
    )
    res.redirect("/admin/orderManagement/cancelled")
}


export const getOrderDetails = (req, res) => {
    let order_id = req.params.id
    connection.query(
        `SELECT *
        FROM orderdetail o 
        JOIN products p ON o.product_id = p.product_id
        JOIN product_detail pd on o.id_prod = pd.id_prod
        WHERE o.order_id = ?`,
        [order_id],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("getOrderDetails.ejs", { listOrderDetails: results });
        }
    );
}


// tim kiem don hang: 
export const findOrder = (req, res) => {
    const orderId = req.query.orderId;
    connection.query(
        `SELECT orders.*, customers.name, customers.email, customers.phone, customers.address, customers.birthday, customers.role, customers.user_name, customers.user_img
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.order_id = ?`,
        [orderId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            // console.log(results);
            res.render("findOrder.ejs", { listOrder: results });
        }
    );
}

// tim kiem san pham : 
export const findProduct = (req, res) => {
    const productName = req.query.ProductName;
    connection.query(
        `SELECT * FROM products WHERE product_name LIKE ?`,
        [`%${productName}%`],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
            }
            // console.log(results);
            res.render("findProduct.ejs", { listProducts: results });
        }
    );
};

// tim kiem nguoi dung: 
export const findCustomer = (req, res) => {
    const input = req.query.customer;
    connection.query(
        `SELECT *
         FROM customers 
         WHERE customer_id = ?`,
        [input],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
            }
            console.log(results);
            res.render("findCustomer.ejs", { listUser: results });
        }
    );
    console.log(input)
};

// /// xoa order:
export const deleteOrder = (req, res) => {
    const orderId = req.params.id
    connection.query(
        `delete from orderdetail 
        WHERE order_id = ?`,
        [orderId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
            }
            connection.query(
                `delete from orders 
                where order_id = ?`,
                [orderId],
                function (err, results) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
                    }
                    res.redirect("/admin/orderManagement/cancelled")
                }
            )
        }
    );
    console.log(orderId);

    // cái của usẻ đâu
}


// export const getInformOrder = (req, res) => {
//     let order_id = req.params.id
//     connection.query(
//         `SELECT *
//         FROM orderdetail o
//         JOIN products p ON o.product_id = p.product_id
//         JOIN product_detail pd on o.id_prod = pd.id_prod
//         WHERE o.order_id = ?`,
//         [order_id],
//         function (err, results) {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Lỗi thông tin khi lấy đơn hàng');
//             }
//             // console.log(results);
//             res.render("getOrderDetails.ejs", { listOrderDetails: results });
//         }
//     );
// }


//dashBoard : 
export const dashBoard = (req, res) => {
    let customer = 'SELECT COUNT(customer_id) AS count FROM customers';
    let product = 'SELECT COUNT(product_id) AS count FROM products';
    let pending = "SELECT COUNT(order_id) AS count FROM orders where status = 1";
    let confirmed = "SELECT COUNT(order_id) AS count FROM orders where status = 2";
    let delivering = "SELECT COUNT(order_id) AS count FROM orders where status = 3";
    let delivered = "SELECT COUNT(order_id) AS count FROM orders where status = 4";
    let cancelled = "SELECT COUNT(order_id) AS count FROM orders where status = 5";
    let totalMoney = `SELECT SUM(total_amount) AS count FROM orders WHERE status = 4 AND YEAR(order_date) = YEAR(CURRENT_DATE()) AND MONTH(order_date) = MONTH(CURRENT_DATE())`;


    // Tạo một hàm trợ giúp để thực hiện truy vấn và trả về Promise
    const doQuery = (query) => {
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result[0].count);
            });
        });
    };

    // Sử dụng Promise.all để đảm bảo tất cả các truy vấn đều hoàn thành
    Promise.all([
        doQuery(customer),
        doQuery(product),
        doQuery(pending),
        doQuery(confirmed),
        doQuery(delivering),
        doQuery(delivered),
        doQuery(cancelled),
        doQuery(totalMoney)
    ]).then((results) => {
        let [customerCount, productCount, pendingCount, confirmedCount, deliveringCount, deliveredCount, cancelledCount, totalMoney] = results;
        console.log(customerCount, productCount, pendingCount, confirmedCount, deliveringCount, deliveredCount, cancelledCount, totalMoney)
        res.render("indexAdmin.ejs", {
            customerCount,
            productCount,
            pendingCount,
            confirmedCount,
            deliveringCount,
            deliveredCount,
            cancelledCount,
            totalMoney
        });
    }).catch((err) => {
        // Xử lý lỗi nếu có
        console.error(err);
        res.status(500).send('Server error');
    });
};
