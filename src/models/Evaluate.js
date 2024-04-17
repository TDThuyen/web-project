import { date, number } from "joi";
import mongoose from "mongoose";

const evaluateSchema = new mongoose.Schema({
    product_id: {
        type: Number,
    },
    customer_id: {
        type: Number,
    },
    rate: {
        type: double,
    },
    comment:{
        type: String,
    },
    date_posted:{
        type: date,    
    }
}, {versionKey: false, timestamps: true})

export default mongoose.model('Evaluate',evaluateSchema);