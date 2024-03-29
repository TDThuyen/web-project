import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
})

export default mongoose.model("Product",productSchema);