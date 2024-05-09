import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../../constants/prisma";
import Org from "../../../../org/[org]/page";
import { ApiError } from "../../../../../utility/ApiError";


export async function GET(req:NextRequest) {
     
    const searchPArams = req.nextUrl.searchParams;
    const  storyId = searchPArams.get("StoryId")

    if (!storyId) {
        throw new ApiError(500,"story id not found")
        
    }

    const story =  await prisma.story.findFirst({
        where:{
            id:storyId
        },
        select:{
            employees:{
                select:{
                    name:true,
                    avatar:true,
                    id:true,
                    email:true
                }
            },
            manager:{
                select:{
                    name:true,
                    avatar:true,
                    id:true
                }
            },
            name:true,
            org:{
                select:{
                    avatar:true,
                    name:true,
                }
            },
            Tasks:{
                select:{
                    reciver:{
                        select:{
                            name:true,
                            avatar:true
                        }
                    },
                    sender:{
                        select:{
                            name:true,
                            avatar:true
                        }
                    },
                    title:true,

                }
            },
            headline:true,
            socketRoomName : true,
            id:true,
            orgId:true
            
        }
        
    })

    return NextResponse.json({
        message:"story Fetched",
        story : story
      })
}


    
