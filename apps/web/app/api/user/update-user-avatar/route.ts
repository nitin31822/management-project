import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { TakeAndUpload } from "../../../takeAndUpload";
import { UploadApiResponse } from "cloudinary";

export async function POST(req:NextRequest) {
 
 
    // const session =  await getServerSession(authOptions)
    //  if (!session) {
    //     throw new ApiError(400,"sesssion not found")
        
    //  }
    //  const user = session.user
   
    const user="65fb01b9900dbfef4bee66d3"
    const findUser = await prisma.user.findFirst({
        where:{
            id:user
        }
    })
    if (!user) {
        throw new ApiError(400,"user not found")
        
    }


    const filesData = await req.formData()
    const formphoto :  File  | null = filesData.get("avatar") as unknown as File

  if (formphoto === null) {
     const updateduserwithnull = await prisma.user.update({
        where : {
            id : user
        } ,
        data :{
            avatar : null
        }
     })
     return NextResponse.json({
        message:"update avatar SUccesfully file is null",
        avatar:updateduserwithnull

})}

let avatar : UploadApiResponse | null = null
avatar = await TakeAndUpload(formphoto)
  if (!avatar) {
    throw new ApiError(500 , "error while uploading image")
  }


    const updateAvatar = await prisma.user.update({
        where:{
            id:user
        },
        data:{
            avatar:avatar.url
        }
    })

    return NextResponse.json({
        message:"user update succesfully",
        avatar:updateAvatar
    })

}