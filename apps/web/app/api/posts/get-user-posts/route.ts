import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400,"session not found")
        
    }

    const user = session.user
    // const user = "660ce6d68f9814e295b498ec"

    const findUser= await prisma.user.findFirst({
        where:{
            id:user.id
        }
    })
    if (!findUser) {
        throw new ApiError(400,"user does not exists")
        
    }

    const userPosts = await prisma.post.findMany({
        where:{
            postOwnerID:user.id ,
            
            
        },select:{
            photo:true,
            postOwner:true,
            title:true,
            videoFile:true,
            videoDuration:true,
            likes:{
                select:{
                    likedBy:{
                        select:{
                            name:true,
                            avatar:true
                        }
                    } ,
                    likedByID : true
                },
            },
            comments:{
                select:{
                    author:{
                        select:{
                            name:true,
                            avatar:true
                        }
                    },likes:{
                        select:{
                            likedBy:{
                                select:{
                                    name:true,
                                    avatar:true
                                }
                            }
                        }
                    }
                }
            },
            id:true,
            createdAt:true,
            impressions:true
    

        }
    })
    
    if (userPosts===null) {
        return NextResponse.json({
            message:"user posts get but post is empty"
        })
        
    }

    return NextResponse.json({
        message:"user posts get",
        posts:userPosts
    })

    
}