// import { NextRequest, NextResponse } from "next/server";
// import { ApiError } from "../../../../utility/ApiError";
// import prisma from "../../../../constants/prisma";

// export async function GET(req : NextRequest) {
//     const searchParams = req.nextUrl.searchParams
//     const postID = searchParams.get("postID")

//     if (!postID) {
//         throw new ApiError(400 , "cannot get postID from searchParams")
//     }

//     const post = await prisma.post.findFirst({
//         where : {
//             id : postID
//         } ,

//         select : {

//           title : true ,
//           impressions : true ,
//           createdAt : true ,
//           videoDuration : true ,
//           videoFile : true ,
//           postOwner : {
//             select : {
//                 avatar : true ,
//                 name : true ,

//             }
//           } ,

//            photo : true ,
//             id : true
//         }
//     })

//     if (!post) {
//         throw new ApiError(404  , "cannot find post with this id")
//     }

//     return NextResponse.json({
//         message : "post fetched successfully" ,
//         post  : post
//     })
// }

import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { postInterface } from "../get-all-posts/route";

const fetchPost = async (postID: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postID,
    },

    select: {
      title: true,
      impressions: true,
      createdAt: true,
      videoDuration: true,
      videoFile: true,
      postOwner: {
        select: {
          avatar: true,
          name: true,
        },
      },
      likes: {
        select: {
          likedByID: true,
          likedBy: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
      photo: true,
      id: true,
    },
  });

  return post;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postID = searchParams.get("postID");

  if (!postID) {
    throw new ApiError(400, "cannot get postID from searchParams");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    const post = await fetchPost(postID);
    if (!post) {
      throw new ApiError(404, "cannot find post with this id");
    }
    const ReturnPost: postInterface = {
      post: post,
      isLiked: false,
      postLikes: post.likes.length,
    };
    return NextResponse.json({
      message: "post fetched successfully",
      post: ReturnPost,
    });
  }

  const user = session.user;

  const post = await fetchPost(postID);
  if (!post) {
    throw new ApiError(404, "cannot find post with this id");
  }
  const isPostLiked = await prisma.like.findFirst({
    where: {
      likedByID: user.id,
      postID: post.id,
    },
  });
  if (isPostLiked) {
    const ReturnPost: postInterface = {
      post: post,
      isLiked: true,
      postLikes: post.likes.length,
    };
    return NextResponse.json({
      message: "post fetched successfully",
      post: ReturnPost,
    });
  }

  const ReturnPost: postInterface = {
    post: post,
    isLiked: false,
    postLikes: post.likes.length,
  };
  return NextResponse.json({
    message: "post fetched successfully",
    post: ReturnPost,
  });
}
