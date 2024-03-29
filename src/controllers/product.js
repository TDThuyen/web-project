import Products from "../models/Products.js";
import { productValidator } from "../validation/product.js";

export const getAll = async (req,res) => {
    const products = await Products.find();
    if(products.length === 0){
        return res.status(404).json({
            message: "ko tim thay"
        })
    }
    return res.status(200).json({
        message: "tim thay san pham",
        datas: products
    })
}

export const getDetail = async (req,res) => {
    const products = await Products.find(req.body);
    if(products.length === 0){
        return res.status(404).json({
            message: "ko tim thay"
        })
    }
    return res.status(200).json({
        message: "tim thay san pham",
        datas: products
    })
}

export const getById = async (req,res) => {
    const product = await Products.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            message: "khong tim thay san pham"
        })
    }
    return res.status(200).json({
        data: product
    })
}

export const create = async (req,res) => {
    try{
        const { error } = productValidator.validate(req.body)
        console.log(error)
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(404).json({
                message: errors
            })
        }
        const product = await Products.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "tao san pham khong thanh cong"
            })
        }
        return res.status(200).json({
            message: "tao san pham thanh cong",
            data: product
        })
    }
    catch(error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const update = (req,res) => {
    res.send('cap nhat san pham');
}

export const remove = (req,res) => {
    res.send('xoa san pham');
}