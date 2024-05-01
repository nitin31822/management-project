import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "../../../constants/prisma";
import { postType , postInterface } from "../posts/get-all-posts/route";
import { checkIsLiked } from "../posts/get-all-posts/route";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      impressions: true,
      createdAt: true,
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
      title: true,
      photo: true,
      videoFile: true,
      videoDuration: true,
      postOwner: {
        select: {
          name: true,
          avatar: true,
          id: true,
        },
      },
      id: true,
    },
    take: 6,
  });
  return posts;
};
const convertPost = async (
  posts: Array<postType>,
  index: number,
  convertedPosts: Array<postInterface>,
  userID: string
): Promise<Array<postInterface>> => {
  if (index >= posts.length) {
    return convertedPosts;
  }
  if (!posts) {
    return convertedPosts;
  }

  const currentPost = posts[index];

  if (currentPost && currentPost.id) {
    const isLiked = await checkIsLiked(currentPost.id, userID);
    const postConvert: postInterface = {
      isLiked: isLiked,
      post: currentPost,
      postLikes: currentPost.likes.length,
    };
    convertedPosts = [...convertedPosts, postConvert];
  }

  return convertPost(posts, index + 1, convertedPosts, userID);
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    const posts = await getPosts();
    return NextResponse.json({
      message: "Home Page without login",
      posts: posts,
      tasks: null,
    });
  } else {
    const user = session.user;
    const userTasks = await prisma.task.findMany({
      where: {
        reciverId: user.id,
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        story: {
          select: {
            socketRoomName: true,
            name: true,
          },
        },
        isCompleted: true,
        sender: {
          select: {
            avatar: true,
            name: true,
            id: true,
          },
        },
        title: true,
        content: true,
        createdAt: true,
      },
    });
    const posts = await getPosts();

    let convertedPosts: Array<postInterface> = [];

    const convertPosts = await convertPost(posts, 0, convertedPosts, user.id);

    return NextResponse.json({
      message: "homepage items fetched",
      tasks: userTasks,
      posts: convertPosts,
    });
  }
}
