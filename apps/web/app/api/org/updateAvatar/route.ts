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
    const avatar : File | null = filesData.get("avatar") as unknown as File

  if (avatar === null) {
     const updatedOrg = await prisma.org.update({
        where : {
            id : findOrg.id
        } ,
        data :{
            avatar : null
        }
     })
     return NextResponse.json({
        message:"update avatar SUccesfully file is null",
        org:updatedOrg


})}
const  avatarfiile = await TakeAndUpload(avatar)
  if (!avatarfiile) {
    throw new ApiError(500 , "error while uploading image")
  }


const updatewithFile = await prisma.org.update({
    where:{
        id:OrgId
    },
    data:{
        avatar:avatarfiile?.url
    }
})

return NextResponse.json({
    message:"update avatar SUccesfully",
    org:updatewithFile
})


}