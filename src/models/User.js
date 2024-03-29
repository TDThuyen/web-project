import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }  
}, {versionKey: false, timestamps: true})

export default mongoose.model('User',userSchema);