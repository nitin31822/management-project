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
    const storyID =  searchParams.get("storyID")

    if (!storyID) {
        throw new ApiError(400 , "cannot get StoryID by searchParams")
    }
    if (storyID.trim() === "") {
        throw new ApiError(400 , "storyID is empty")
    }
    const story = await prisma.story.findFirst({
        where : {
            id : storyID
        }
    })

    if (!story) {
        throw new ApiError(400 , "cannot found Story By givenId")
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
            Story : {
                connect : {
                    id : story.id
                }
            }
        }
    })

    return NextResponse.json({
        message : "notification created Successfully" ,
        notification : newNotification 
    })
}