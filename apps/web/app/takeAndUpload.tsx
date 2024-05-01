import { writeFile } from "fs/promises";
import { uploadOnCloudinary } from "../constants/cloudinary"

export const TakeAndUpload = async (file: File) => {
  if (!file) {
    return null;
  }
  console.log( "fileS" , file);
  

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);
  const path = `./public/${file.name}`;
  await writeFile(path, buffer);

  const CloudinaryFile = await uploadOnCloudinary(path);
  

  if (CloudinaryFile === null) {
    return null;
  }
  return CloudinaryFile;
};
