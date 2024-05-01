import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "../../../constants/prisma";

const getPosts =  async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            impressions: "desc",
          },
          select: {
            comments: {
              select: {
                author: {
                  select: {
                    name: true,
                    avatar: true,
                    id : true
                  },
                },
                content: true,
               
              },
            },
            impressions: true,
            createdAt: true,
            likes: {
              select: {
                likedBy: {
                  select: {
                    name: true,
                    avatar: true,
                    id : true
                  },
                },
              },
            },
            title: true,
            photo: true,
            videoFile: true,
            videoDuration: true,
            postOwner: {
              select: {
                name: true,
                avatar: true,
                id : true
              },
            },
            id: true,
          },
          take : 6
    })
    return posts
}

export async function GET(req : NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        const posts = await getPosts()
        return NextResponse.json({
            message : "Home Page without login"  ,
            posts : posts ,
            tasks : null
        })
    }else{
        const user = session.user
        const userTasks = await prisma.task.findMany({
            where : {
                reciverId : user.id ,

            } ,
            take : 3 ,
            orderBy : {
                createdAt : "desc"
            } ,
            select : {
                story : {
                     select : {
                        socketRoomName : true ,
                        name : true ,

                     }
                } ,
                isCompleted : true ,
                sender : {
                    select : {
                        avatar : true ,
                        name : true
                    }
                } ,
                title : true ,
                content : true ,
                createdAt : true ,

            }
        })
        const posts = await getPosts()
        return NextResponse.json({
            message : "homepage items fetched" ,
            tasks : userTasks ,
            posts : posts
        })
    }
}