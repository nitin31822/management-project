import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function GET(req:NextRequest) {

    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400,"seesion not found")
        
    }
    const user = session.user
    const findUser =await prisma.user.findFirst({
        where:{
            id:user.id
        },
        select:{
            avatar:true,
            coverImage:true,
            email:true,
            friends:true,
            name:true,
            posts:{
                select:{
                    photo:true,
                    likes:{
                        select:{
                            likedBy:{
                                select:{
                                    name:true,
                                    avatar:true
                                }
                            }
                        }
                    },
                    comments:{
                        select:{
                            content:true,
                            author:{
                                select:{
                                    name:true,
                                    avatar:true
                                },
                                
                            },
                            likes:{
                                select:{
                                    likedBy:{
                                        select:{
                                            name:true,
                                            avatar:true
                                        }
                                    }
                                }
                            }
                        },
                        

                    },
                    postOwner:{
                        select:{
                            name:true,
                            avatar:true
                        }
                    },
                    postOrg:{
                        select:{
                            avatar:true,
                            name:true
                        }
                    },
                    title:true,
                    videoFile:true,
                    videoDuration:true,
                    createdAt:true,
                    id:true
                }

            },
            org:{
                select:{
                    name:true,
                    avatar:true
                }
            },
            createdAt:true,
            id:true,
            FriendsListUser:true,
            
        }

    })
    if (!findUser) {
        throw new ApiError(400,"user not found")
        
    }
    return NextResponse.json({
        message:"user get succesfully",
        user:  findUser
    })

   
}