import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../constants/prisma";

export async function POST (req : NextRequest) {
    const reqBody = await req.json()

    const {content} : {content : string}  = reqBody
    
    if (!content) {
        throw new ApiError(400 , "cannot get content")
    }

    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400 , "cannot send notification without login")
    }
    const sender = session.user
  
    const searchParams = req.nextUrl.searchParams
    const recieverId = searchParams.get("recieverID")
    if (!recieverId) {
        throw new ApiError(400 , "cannot get recieverId By searchParams")
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

    const orgID =  searchParams.get("orgID")

    if (!orgID) {
        throw new ApiError(400 , "cannot get  orgID by searchParams")
    }
    if (orgID.trim() === "") {
        throw new ApiError(400 , "orgID is empty")
    }
    const org = await prisma.story.findFirst({
        where : {
            id : orgID
        }
    })

    if (!org) {
        throw new ApiError(400 , "cannot found Story By givenId")
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
            Org : {
                connect : {
                    id : org.id
                }
            }
        }
    })

    return NextResponse.json({
        message : "notification created Successfully" ,
        notification : newNotification 
    })
}


