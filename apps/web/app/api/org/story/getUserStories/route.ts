import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { ApiError } from "../../../../../utility/ApiError";
import prisma from "../../../../../constants/prisma";

export async function GET(req:NextRequest) {

    // const searchParams = req.nextUrl.searchParams
    // const userId = searchParams.get("UserId")
    // if(!userId){
    //     throw new ApiError(400,"User Id Not Founnd")
    // }
    // const findUser = await prisma.user.findFirst({
    //     where:{
    //         id:userId
    //     }
    // })
    // if (!findUser) {
    //     throw new ApiError(400,"user  not found")
    // }
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new  ApiError(400  , "session not found")
      }

      const user = session.user
     if (!user) {
        throw new ApiError(400,"User Not Found")
        
     }
     console.log(user);
     

    //  const Stories = await prisma.story.findMany({
    //     where:{
    //     employees:{
    //         every:{
    //             id : user.id
    //         }
            

            
    //     },
    //     employeeID : {
    //         has : user.id
    //     },
    //     manager:{
    //         id:user.id
    //     }
    //     },
    //     select:{
        
    //         name:true,
    //         id:true,
    //         headline:true,
    //         socketRoomName:true


    //     }
    //  })
    const Stories = await prisma.story.findMany()
     if (Stories===null) {
        return NextResponse.json({
            message:"stories of user get , stories are null",

        })
        
     }
console.log(Stories);

     return NextResponse.json({
        message:"stories of user get",
        Stories:Stories
     })
   

    
}