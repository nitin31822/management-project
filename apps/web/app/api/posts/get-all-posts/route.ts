import { Org, User } from "@prisma/client";
import { promises } from "dns";
import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { log } from "console";



export interface postType {
  
    impressions: number;
    createdAt: Date;
    // likes: Array<likes>;
    title: string | null;
    photo: string | null;
    videoFile: string | null;
    videoDuration: string | null;
    postOwner: user;
    id: string;
  }
  export interface Comments {
    author: user;
    content: string;
    likes: Array<likes>;
  }
   export interface user {
    name: string;
    avatar: string | null;
  
  }
  export interface likes {
    likedBy: user;
    likedByID : string
  }
  
  const fetchFriendPosts = async(friendId : string) => {
    const posts = await prisma.post.findMany({
        where : {
            postOwnerID : friendId
        }, orderBy: {
            createdAt: "desc",
          },
          select: {
           
            impressions: true,
            createdAt: true,
            likes: {
              select: {
                likedBy: {
                  select: {
                    name: true,
                    avatar: true,
                    
                  },
                },
                likedByID : true
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
                
              },
            },
            id: true,
          },
    })

    return posts
  }

  const fetchOrgPosts = async(orgId:string)=>{
    const posts = await prisma.post.findMany({
        where:{
            postOrgID:orgId 
        },
        select: {
           
            impressions: true,
            createdAt: true,
            // likes: {
            //   select: {
            //     likedBy: {
            //       select: {
            //         name: true,
            //         avatar: true,
                    
            //       },
            //     },
            //     likedByID : true
            //   },
            // },
            title: true,
            photo: true,
            videoFile: true,
            videoDuration: true,
            postOwner: {
              select: {
                name: true,
                avatar: true,
                
              },
            },
            id: true,
          },
    })
    return posts
  }

const fn  = async(
    friends:Array<User>,
    index:number,
    posts:Array<postType>
):Promise<Array<postType>|null>=>{
    if (!friends) {
       return null  
    }
    if (index >= friends.length) {
   
        return posts;
      }
    const currentFriend = friends[index]
    
    if (currentFriend && currentFriend.id) {
        const friendPost = await fetchFriendPosts(currentFriend.id)
        posts = [...posts  , ...friendPost]
    }
    return fn(friends , index+1 , posts)
}

const orgfn = async (
    organisations:Array<Org>,
    index:number,
    posts:Array<postType>
):Promise<Array<postType>|null>=>{
    if (!organisations) {
        return null;

    }
    if (index>=organisations.length) {
        return posts
        
    }
    const currentOrg = organisations[index]

    if (currentOrg && currentOrg.id) {
        const fetchPosts = await fetchOrgPosts(currentOrg.id)
        posts = [...posts, ...fetchPosts]
        
    }
    return orgfn(organisations,index+1,posts)

}


export async function GET(req:NextRequest) {
    const seesion =  await getServerSession(authOptions)
    if (!seesion) {

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
        })
        return NextResponse.json({
            message:"posts without login is fetched",
            posts:posts
        })
        
    }
    let posts: Array<postType> = [];
    const user = seesion.user

    console.log( "user",user);
    
    const userProfile = await prisma.friendsList.findFirst({
        where:{
            userId:user.id
        },
        include:{
            friends:true
        }
    })

    const friends = userProfile?.friends

    if (!friends) {
      console.log("friend nahi hai");
      
        return NextResponse.json({
          message : "friends nahi hais"
        })
        
    }
    const friendPosts = await fn(friends,0,posts)

    const userjoinedOrgs = await prisma.org.findMany({
        where:{
            owner:{
                every:{
                    id:user.id
                }
            },
            employees:{
                every:{
                    id:user.id
                }
            }
        }
    })
    const orgPosts = await orgfn(userjoinedOrgs,0,posts)
    console.log(orgPosts);
    

    const allPosts = [...orgPosts??[],...friendPosts??[]]
    console.log(allPosts);
    
    return NextResponse.json({
      message : "posts fetched" ,
      posts : allPosts
    })
} 