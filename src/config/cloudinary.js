import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: "img"
  }
});

const uploadCloud = multer({ storage });

export default uploadCloud;