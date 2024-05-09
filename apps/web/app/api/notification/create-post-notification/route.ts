import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";


export async function  POST(req : NextRequest) {

    const reqBody = await req.json()
    const {content} : {content : string}  = reqBody
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400 , "cannot send notification without login")
    }
    const sender = session.user

    const searchParams = req.nextUrl.searchParams
    const postID =  searchParams.get("postID")

    if (!postID) {
        throw new ApiError(400 , "cannot get postID by searchParams")
    }
    if (postID.trim() === "") {
        throw new ApiError(400 , "postID is empty")
    }
    const post = await prisma.post.findFirst({
        where : {
            id : postID
        }
    })

    if (!post) {
        throw new ApiError(400 , "cannot found post By givenId")
    }

    const recieverId = searchParams.get("recieverID")
    if (!recieverId) {
        throw new ApiError(400 , "cannot get StoryID By searchParams")
    }
    if (recieverId.trim() === "") {
        throw new ApiError(400 , "reciever ID is empty")
    }

    const reciever = await prisma.user.findFirst({
        where : {
            id : recieverId
        }
    })

    if (!reciever) {
        throw new ApiError(400 , "cannot found reciever By givenID")
    }

  
    const newNotification = await prisma.notification.create({
        data : {
            content : content,
            sender : {
                connect : {
                    id : sender.id
                }
            } ,
            reciever : {
                connect : {
                    id : reciever.id
                }
            } ,
            post : {
                connect : {
                    id : post.id
                }
            }
        }
    })

    return NextResponse.json({
        message : "notification created Successfully" ,
        notification : newNotification 
    })
}