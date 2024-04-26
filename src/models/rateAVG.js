import mongoose from "mongoose";

const rateavgSchema = new mongoose.Schema({
    product_id: {
        type: Number,
    },
    rate_sum: {
        type: Number,
    },
    user_sum: {
        type: Number,
    }
}, {versionKey: false, timestamps: true})

export default mongoose.model('rateAVG',rateavgSchema);