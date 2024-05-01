import { NextResponse,NextRequest } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req:NextRequest) {
    const serachparams = req.nextUrl.searchParams
    const PostId =  serachparams.get("PostId")

    if (!PostId) {
        throw new ApiError(400,"searchParams not get Post Id")
        
    }
    const searchPost = await prisma.post.findFirst({
        where:{
            id:PostId
        },
       
    })
    if (!searchPost) {
        throw new ApiError(400,"post did not found")
    }

    const session  = await getServerSession(authOptions)
   if (!session) {
    throw new ApiError(400,"user not found")
   }
   const user = session?.user

   const alreadyLike  = await prisma.like.findFirst({
    where:{
        postID:searchPost.id,
        likedByID:user.id
         }
 })
 
 if (alreadyLike ) {

      await prisma.like.delete({
        where:{
            id:alreadyLike.id
        }
      })

        return NextResponse.json({
           message:"unlike succesfully",
           isLiked:false
        })
 }else{
    const createlike = await prisma.like.create({
     data:{
        post:{
            connect:{
                id:searchPost.id
            }
        },
        likedBy:{
            connect:{
                id:user.id
            }
        }
     }
    })
 }

 return NextResponse.json({
    message:"Like succesfully",
    isLiked:true
 })
    
}