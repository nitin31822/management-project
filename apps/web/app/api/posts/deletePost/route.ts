import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function POST(req:NextRequest) {
    const serachparams = req.nextUrl.searchParams
    const PostId =  serachparams.get("PostId")

    if (!PostId) {
        throw new ApiError(400,"searchParams not get Post Id")
        
    }

    const searchPost = await prisma.post.findFirst({
        where:{
            id:PostId
        }
    })

    if (!searchPost) {
        throw new ApiError(400,"Post did not get")
        
    }

    const deletePost = await prisma.post.delete({
        where:{
            id:searchPost.id ,
            
        }
    })

    return  NextResponse.json({
        message: "post delete succesfully"
    })
}