import { NextResponse,NextRequest } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function GET(req:NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
        throw new ApiError(400,"user not found")
        
    }

    const getuser = await prisma.user.findFirst({
        where:{
            id:userId
        },
        select:{
            avatar:true,
            coverImage:true,
            email:true,
            posts:true,
          friends:true,
          name:true,
          id:true,
         
          }
        }

    )
    return NextResponse.json({
        message:"user profile get succesfully",
        userProfile:getuser
    })
    
}