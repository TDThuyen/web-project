
import mongoose from "mongoose";

const evaluateSchema = new mongoose.Schema({
    product_id: {
        type: Number,
    },
    customer_id: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    comment:{
        type: String,
    },
    date_posted:{
        type: Date,  // Sử dụng kiểu dữ liệu Date của Mongoose
        default: new Date()
    }
}, {versionKey: false, timestamps: true})


export default mongoose.model('Evaluate',evaluateSchema);