import axios from "axios";

interface friends {
    name: string;
    avatar: string;
  }
interface commentOwner {
    avatar: string | null;
    name: string;
  }
  export interface user {
    avatar: string | null;
    coverImage: string;
    email: string;
    friends: Array<friends>;
    name: string;
    posts: Array<posts>;
    id: string;
    org: Array<Orgs>;
    createdAt: Date;
    FriendsListUser: Array<friends>;
  }
  interface postOwner {
    name: string;
    avatar: string;
  }

interface Orgs {
  avatar: string;
  name: string;
}
  interface posts {
    photo: string;
    videoFile: string;
    videoDuration: number;
    createdAt: Date;
    id: string;
    title: true;
    postOrg: Array<Orgs>;
    postOwner: postOwner;
    comments: Array<Icomments>;
    likes: Array<likes>;
  }
  interface likes {
    likedBy: user;
  }
  interface Icomments {
    content: string;
    author: commentOwner;
    likes: Array<likes>;
  }

  export interface commentsType{
    message:string
    PostComments:Array<Icomments>
  }

export const getpostCoomments= async(PostId:string)=>{
    const {data}: {data:commentsType} =  await axios.get(`/api/comments/getPostComments?PostId=${PostId}`)
    return data.PostComments
}