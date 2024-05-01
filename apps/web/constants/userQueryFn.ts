import axios from "axios";

interface friends {
  name: string;
  avatar: string;
}
interface postOwner {
  name: string;
  avatar: string;
}
interface Orgs {
  avatar: string;
  name: string;
}
interface commentOwner {
  avatar: string;
  name: string;
}

interface likes {
  likedBy: user;
  likedByID : string
}
interface Icomments {
  content: string;
  author: commentOwner;
  likes: Array<likes>;
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
export interface userposts {
  photo: string;
  videoFile: string;
  videoDuration: number;
  createdAt: Date;
  id: string;
  title: true;
  postOwner: postOwner;
  comments: Array<Icomments>;
  likes: Array<likes>;
}
export interface user {
  avatar: string;
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

export interface userType {
  message: string;
  user: user;
}
export interface userPostType{
  message:string,
  posts:Array<userposts>
}

 export const getUser = async () => {
  const { data }: { data: userType } = await axios.get(`api/user/get-user`);
  return data.user;
};
export const  getuserPosts = async()=>{
  const {data}:{data:userPostType}= await axios.get('/api/posts/get-user-posts')
  return data.posts
}

