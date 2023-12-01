import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"; // filesystem in node

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinart
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file is uploaded on Cloudinary

    fs.unlinkSync(localFilePath); // file is delete from sever

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the save temp file as upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
