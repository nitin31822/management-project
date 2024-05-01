import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

// Configure Cloudinary using environment variables
cloudinary.config({ 
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME as string, 
    api_key: process.env.CLOUDNIARY_API_KEY as string, 
    api_secret: process.env.CLOUDNIARY_API_SECRET as string
});
 cloudinary.api.resource( "qzuqnt4okjrxszekbgm8",{
    resource_type : "video" ,
    media_metadata : true
 })

// Define the uploadOnCloudinary function
const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
    try {
        if (!localFilePath) {
            console.log("COULD NOT FIND THE FILE !!");
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File uploaded successfully
        // console.log("successfully upload", response);
        
        // Delete the local file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Error during upload process
        console.error("Error uploading file:", error);

        // Delete the local file
        fs.unlinkSync(localFilePath);

        return null;
    }
};

export { uploadOnCloudinary };
