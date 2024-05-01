import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { TakeAndUpload } from "../../../takeAndUpload";

export async function POST(req:NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const OrgId = searchParams.get("OrgId")
    if (!OrgId) {
        throw new ApiError(400,"org params not found")
    }
    const findOrg=await prisma.org.findFirst({
        where:{
            id:OrgId
        }
    })
    if (!findOrg) {
        throw new ApiError(400,"org not found")
        
    }

    const filesData = await req.formData()
    const coverIamgePhoto : File | null = filesData.get("coverImage") as unknown as File

  if (coverIamgePhoto === null) {
     const updatedOrg = await prisma.org.update({
        where : {
            id : findOrg.id
        } ,
        data :{
            coverImage : null
        }
     })
     return NextResponse.json({
        message:"update coverImage SUccesfully file is null",
        org:updatedOrg


})}
const  coverImage = await TakeAndUpload(coverIamgePhoto)
  if (!coverImage) {
    throw new ApiError(500 , "error while uploading image")
  }


const updatewithFile = await prisma.org.update({
    where:{
        id:OrgId
    },
    data:{
        coverImage:coverImage.url
    }
})

return NextResponse.json({
    message:"update coverImage SUccesfully",
    org:updatewithFile
})


}