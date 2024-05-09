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
    const taskID =  searchParams.get("taskID")

    if (!taskID) {
        throw new ApiError(400 , "cannot get taskID by searchParams")
    }
    if (taskID.trim() === "") {
        throw new ApiError(400 , "taskID is empty")
    }
    const task = await prisma.task.findFirst({
        where : {
            id : taskID
        }
    })

    if (!task) {
        throw new ApiError(400 , "cannot found Story By givenId")
    }

    const recieverId = searchParams.get("recieverID")
    if (!recieverId) {
        throw new ApiError(400 , "cannot get recieverID By searchParams")
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
           Task : {
            connect : {
                id : task.id
            }
        }
        }
    })

    return NextResponse.json({
        message : "notification created Successfully" ,
        notification : newNotification 
    })
}