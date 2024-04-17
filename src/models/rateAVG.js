import mongoose from "mongoose";

const rateavgSchema = new mongoose.Schema({
    rate_sum: {
        type: double,
    },
    user_sum: {
        type: Number,
    }
}, {versionKey: false, timestamps: true})

export default mongoose.model('rateAVG',rateavgSchema);