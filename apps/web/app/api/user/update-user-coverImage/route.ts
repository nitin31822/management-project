import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../constants/prisma";
import { ApiError } from "../../../../utility/ApiError";
import { UploadApiResponse } from "cloudinary";
import { TakeAndUpload } from "../../../takeAndUpload";

export async function POST(req:NextRequest) {
   
    // const session =  await getServerSession(authOptions)
    //  if (!session) {
    //     throw new ApiError(400,"sesssion not found")
        
    //  }
    //  const user = session.user
   
    const user="660ce6d68f9814e295b498ec"
    const findUser = await prisma.user.findFirst({
        where:{
            id:user
        }
    })
    if (!user) {
        throw new ApiError(400,"user not found")
        
    }


    const filesData = await req.formData()
    const formphoto :  File  | null = filesData.get("coverImage") as unknown as File

  if (formphoto === null) {
     const updateduserwithnull = await prisma.user.update({
        where : {
            id : user
        } ,
        data :{
            coverImage : null
        }
     })
     return NextResponse.json({
        message:"update coverImage SUccesfully file is null",
        coverImage:updateduserwithnull

})}

let coverImage : UploadApiResponse | null = null
coverImage = await TakeAndUpload(formphoto)
  if (!coverImage) {
    throw new ApiError(500 , "error while uploading image")
  }


    const updateCoverImage = await prisma.user.update({
        where:{
            id:user
        },
        data:{
            coverImage:coverImage.url
        }
    })

    return NextResponse.json({
        message:"user update succesfully",
        coverImage:updateCoverImage
    })
}