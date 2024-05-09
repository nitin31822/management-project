import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface reqBody {
    content : string
}

export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400 , "you cannot send Notification")
    }

    const user = session.user

    const reqBody : reqBody = await req.json()
    const {content} = reqBody

    if (content.trim() === "") {
        throw new ApiError(400 , "content is empty")
    }
   
    const searchParams  = req.nextUrl.searchParams
    const recieverID = searchParams.get("recieverID")
    

    if (!recieverID) {
        throw new ApiError(400 , "recieverID is null")
    }
    if (recieverID.trim() === "") {
        throw new ApiError(400 , "recieverId is empty")
    }

    if (user.id === recieverID) {
        throw new ApiError(400  , "user cannot send a notification to himself")
    }

    const reciever = await prisma.user.findFirst({
        where : {
            id : recieverID
        }
    })

    
    if (!reciever) {
        throw new ApiError(404 , "receiver user not found")
    }
     

    
    const newNotification = await prisma.notification.create({
        data : {
            content : content ,
            reciever : {
                connect : {
                    id : reciever.id
                }
            } ,
            sender : {
                connect : {
                    id : user.id
                }
            }
        }
    })
      
    const createdNotification = await prisma.notification.findFirst({
        where : {
            id : newNotification.id
        } ,
        select : {
            id : true ,
            recieverID : true ,
            content : true
        }
    })

    if (!createdNotification) {
        throw new ApiError(500 , "error while creating notification")
    }
    
    return NextResponse.json({
        message : "notification cerated" ,
        notification : createdNotification
    })
    
}