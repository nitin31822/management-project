import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import { prisma } from "../../../../constants/prisma";

export async function GET(req:NextRequest) {
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
    

    const postComments = await prisma.comment.findMany({
        where:{
            postID:searchPost.id
        },select:{
            _count:true,
            author:true,
            authorId:true,
            content:true,
            createdAt:true,
            id:true,
            likes:true,
            post:true,
            postID:true,
            updatedAt:true
        } ,
        orderBy :{
            createdAt : "desc"
        }
    })
    return NextResponse.json({
        message:"post comments get sucesfully",
        PostComments:postComments
    })
    
}