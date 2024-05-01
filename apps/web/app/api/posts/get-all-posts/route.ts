// import { Org, User } from "@prisma/client";
// import { promises } from "dns";
// import { NextRequest,NextResponse } from "next/server";
// import prisma from "../../../../constants/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { log } from "console";



// export interface postType {
  
//     impressions: number;
//     createdAt: Date;
//     // likes: Array<likes>;
//     title: string | null;
//     photo: string | null;
//     videoFile: string | null;
//     videoDuration: string | null;
//     postOwner: user;
//     id: string;
//   }
//   export interface Comments {
//     author: user;
//     content: string;
//     likes: Array<likes>;
//   }
//    export interface user {
//     name: string;
//     avatar: string | null;
  
//   }
//   export interface likes {
//     likedBy: user;
//     likedByID : string
//   }
  
//   const fetchFriendPosts = async(friendId : string) => {
//     const posts = await prisma.post.findMany({
//         where : {
//             postOwnerID : friendId
//         }, orderBy: {
//             createdAt: "desc",
//           },
//           select: {
           
//             impressions: true,
//             createdAt: true,
//             likes: {
//               select: {
//                 likedBy: {
//                   select: {
//                     name: true,
//                     avatar: true,
                    
//                   },
//                 },
//                 likedByID : true
//               },
//             },
//             title: true,
//             photo: true,
//             videoFile: true,
//             videoDuration: true,
//             postOwner: {
//               select: {
//                 name: true,
//                 avatar: true,
                
//               },
//             },
//             id: true,
//           },
//     })

//     return posts
//   }

//   const fetchOrgPosts = async(orgId:string)=>{
//     const posts = await prisma.post.findMany({
//         where:{
//             postOrgID:orgId 
//         },
//         select: {
           
//             impressions: true,
//             createdAt: true,
//             // likes: {
//             //   select: {
//             //     likedBy: {
//             //       select: {
//             //         name: true,
//             //         avatar: true,
                    
//             //       },
//             //     },
//             //     likedByID : true
//             //   },
//             // },
//             title: true,
//             photo: true,
//             videoFile: true,
//             videoDuration: true,
//             postOwner: {
//               select: {
//                 name: true,
//                 avatar: true,
                
//               },
//             },
//             id: true,
//           },
//     })
//     return posts
//   }

// const fn  = async(
//     friends:Array<User>,
//     index:number,
//     posts:Array<postType>
// ):Promise<Array<postType>|null>=>{
//     if (!friends) {
//        return null  
//     }
//     if (index >= friends.length) {
   
//         return posts;
//       }
//     const currentFriend = friends[index]
    
//     if (currentFriend && currentFriend.id) {
//         const friendPost = await fetchFriendPosts(currentFriend.id)
//         posts = [...posts  , ...friendPost]
//     }
//     return fn(friends , index+1 , posts)
// }

// const orgfn = async (
//     organisations:Array<Org>,
//     index:number,
//     posts:Array<postType>
// ):Promise<Array<postType>|null>=>{
//     if (!organisations) {
//         return null;

//     }
//     if (index>=organisations.length) {
//         return posts
        
//     }
//     const currentOrg = organisations[index]

//     if (currentOrg && currentOrg.id) {
//         const fetchPosts = await fetchOrgPosts(currentOrg.id)
//         posts = [...posts, ...fetchPosts]
        
//     }
//     return orgfn(organisations,index+1,posts)

// }


// export async function GET(req:NextRequest) {
//     const seesion =  await getServerSession(authOptions)
//     if (!seesion) {

//         const posts = await prisma.post.findMany({
//             orderBy: {
//                 impressions: "desc",
//               },
//               select: {
//                 comments: {
//                   select: {
//                     author: {
//                       select: {
//                         name: true,
//                         avatar: true,
//                         id : true
//                       },
//                     },
//                     content: true,
//                     likes: {
//                       select: {
//                         likedBy: {
//                           select: {
//                             name: true,
//                             avatar: true,
//                             id : true
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//                 impressions: true,
//                 createdAt: true,
//                 likes: {
//                   select: {
//                     likedBy: {
//                       select: {
//                         name: true,
//                         avatar: true,
//                         id : true
//                       },
//                     },
//                   },
//                 },
//                 title: true,
//                 photo: true,
//                 videoFile: true,
//                 videoDuration: true,
//                 postOwner: {
//                   select: {
//                     name: true,
//                     avatar: true,
//                     id : true
//                   },
//                 },
//                 id: true,
//               },
//         })
//         return NextResponse.json({
//             message:"posts without login is fetched",
//             posts:posts
//         })
        
//     }
//     let posts: Array<postType> = [];
//     const user = seesion.user

//     console.log( "user",user);
    
//     const userProfile = await prisma.friendsList.findFirst({
//         where:{
//             userId:user.id
//         },
//         include:{
//             friends:true
//         }
//     })

//     const friends = userProfile?.friends

//     if (!friends) {
//       console.log("friend nahi hai");
      
//         return NextResponse.json({
//           message : "friends nahi hais"
//         })
        
//     }
//     const friendPosts = await fn(friends,0,posts)

//     const userjoinedOrgs = await prisma.org.findMany({
//         where:{
//             owner:{
//                 every:{
//                     id:user.id
//                 }
//             },
//             employees:{
//                 every:{
//                     id:user.id
//                 }
//             }
//         }
//     })
//     const orgPosts = await orgfn(userjoinedOrgs,0,posts)
//     console.log(orgPosts);
    

//     const allPosts = [...orgPosts??[],...friendPosts??[]]
//     console.log(allPosts);
    
//     return NextResponse.json({
//       message : "posts fetched" ,
//       posts : allPosts
//     })
// } 
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../constants/prisma";
import { Org, User } from "@prisma/client";



export interface postType {
   likes : Array<likes>
  impressions: number;
  createdAt: Date;
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
interface user {
  name: string;
  avatar: string | null;

}
export interface likes {
  likedBy: user;
  likedByID : string
}

export interface postInterface {
  post : postType
  isLiked : boolean
  postLikes : number 
}

export const checkIsLiked = async (postID : string , userID : string) => {
   const isLiked = await prisma.like.findFirst({
    where : {
      postID : postID ,
      likedByID : userID
    }
   })

   if (!isLiked) {
    return false
   }
   return true
}

const fetchFriendPost = async (friendID: string): Promise<Array<postType>> => {
  const posts = await prisma.post.findMany({
    where: {
      postOwnerID: friendID,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
     
      impressions: true,
      createdAt: true,
     
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
      likes : {
        select : {
            likedByID : true ,
            likedBy : {
                select : {
                    name : true ,
                    avatar : true
                }
            }
        }
      } ,
      id: true,
    },
  });

  return posts;
};

const fetchOrgPost = async (orgID: string) => {
  console.log(orgID);

  const posts = await prisma.post.findMany({
    where: {
      postOrgID: orgID,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      
      impressions: true,
      createdAt: true,
      
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
      likes : {
        select : {
            likedByID : true ,
            likedBy : {
                select : {
                    name : true ,
                    avatar : true
                }
            }
        }
      } ,
      id: true,
    },
  });

  return posts;
};
const fetchOrgPosts = async (
  orgs: Array<Org>,
  index: number,
  posts: Array<postType>
): Promise<Array<postType> | null> => {
  if (!orgs) {
    return null;
  }

  if (index >= orgs.length) {
    return posts;
  }

  const currentOrg = orgs[index];

  if (currentOrg && currentOrg.id) {
    const orgposts = await fetchOrgPost(currentOrg.id);

    posts = [...posts, ...orgposts];
  }

  // Call the function recursively with index incremented
  return fetchOrgPosts(orgs, index + 1, posts);
};

const fn = async (
  friends: Array<User>,
  index: number,
  posts: Array<postType>
): Promise<Array<postType> | null> => {
  if (!friends) {
    return null;
  }

  if (index >= friends.length) {
    console.log(posts);
    return posts;
  }

  const currentFriend = friends[index];

  if (currentFriend && currentFriend.id) {
    const friendPost = await fetchFriendPost(currentFriend.id);

    posts = [...posts, ...friendPost];
  }

  // Call the function recursively with index incremented
  return fn(friends, index + 1, posts);
};

const fetchposts = async() => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt : "desc",
    },
    select: {
      
      impressions: true,
      createdAt: true,
     
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
      likes : {
        select : {
            likedByID : true ,
            likedBy : {
                select : {
                    name : true ,
                    avatar : true
                }
            }
        }
      } ,
      id: true,
    },
  });
  return posts
}

const convertPost = async (posts : Array<postType> , index : number , convertedPosts : Array<postInterface> , userID : string) : Promise<Array<postInterface>> => {
  if (index >= posts.length) {
    return convertedPosts
  }
  if (!posts) {
    return convertedPosts
  }

  const currentPost = posts[index]

  if (currentPost && currentPost.id) {
    const isLiked = await checkIsLiked(currentPost.id , userID)
    const postConvert : postInterface  = {
      isLiked : isLiked ,
      post : currentPost ,
      postLikes : currentPost.likes.length
    }
    convertedPosts = [...convertedPosts , postConvert]
  }

  return convertPost(posts , index+1 , convertedPosts , userID)
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  
  if (!session) {
    // if user are not login then we send our app most famous posts
   const posts = await fetchposts()
    return NextResponse.json({
      message: "posts without login fetched",
      posts: posts,
    });
  }


  const user = session.user;
  const userFriendsProfile = await prisma.friendsList.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      friends: true,
    },
  });

  let posts: Array<postType> = [];

  const friends = userFriendsProfile?.friends;

  let friendsPosts : Array<postType> | null = []

  if (friends) {
   
    friendsPosts = await fn(friends, 0, posts);
    console.log("friendsPost", friendsPosts);
    
  } 


  const userActiveOrgs = await prisma.org.findMany({
    where: {
      owner: {
        every: {
          id: user.id,
        },
      },
      employees: {
        every: {
          id: user.id,
        },
      },
    },
  });
  let orgposts  : Array<postType> | null = []


  if (userActiveOrgs) {
    orgposts = await fetchOrgPosts(userActiveOrgs, 0, posts);
    console.log("orgposts" , orgposts);
    
  }



  let allPosts = [...(friendsPosts ?? []), ...(orgposts ?? [])];

  if (allPosts.length < 6) {
    console.log("if condition chali");
    
    const posts  = await fetchposts()
    console.log("fetchposts" , posts);
    
    allPosts = [...allPosts , ...posts]

  }




  let convertedPosts : Array<postInterface> = []

  const convertPosts = await convertPost(allPosts , 0 , convertedPosts , user.id)

  

  console.log("convertedPosts" , convertPosts);
  

  return NextResponse.json({
    message: " post fetches",
    posts: convertPosts,
  });
}
