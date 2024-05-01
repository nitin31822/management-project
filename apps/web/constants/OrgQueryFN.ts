import { Org } from "@prisma/client";
import axios from "axios";

export interface orgType {
  id: string;
  name: string;
  bio: string;
  avatar: string | null;
  coverImage: string | null;
  email:string
  posts: Array<Iposts>;
  story: Array<story>;
  socketRoomName:string
}
interface Iposts {
  comments: Array<IComments>;
  photo: string | null;
  impressions: number;

  likes: Array<Ilikes>;
  videoFile: string | null;
  videoDuration: string | null;
  title: string | null;
  createdAt: Date;
  postOwner: author;
}
interface IComments {
  content: string;
  author: author;
  likes: Array<Ilikes>;
}
interface Ilikes {
  likedBy: author;
}
interface author {
  avatar: string | null;
  name: string;
}
interface story {
  employeeID: Array<string>;
  id: string;
  name: string;
  socketRoomName: string;
  manager: author | null;
  
}
export interface orgsType{
  message:string,
  orgs:Array<orgType>
}
export interface getOrgType {
  message: string;
  oorg: orgType;
}
export interface OrgStories {
  message: string;
  stories: Array<story>;
}
export interface orgPosts {
  message: string;
  posts: Array<Iposts>;
}
export interface PostComments {
  message: string;
  PostComments: Array<IComments>;
}

export const fetch = async () => {
  const { data }:{data:orgsType} = await axios.get("/api/org/get-orgs");
  console.log("fetch", data);
  return data.orgs;
};

export const post = async (orgData: any) => {
  const { data } = await axios.post("/api/org/create-org", orgData);
  return data.org;
};

export const onlyOrg = async (orgId: string) => {
  const { data }: { data: getOrgType } = await axios.get(
    `/api/org/get-org?OrgId=${orgId}`
  );
  return data.oorg;
};
export const postFetch = async (orgID: string) => {
  const { data }: { data: orgPosts } = await axios.get(
    `/api/posts/getOrgPost?OrgId=${orgID}`
  );
  console.log("Org Posts", data);
  return data.posts;
};

export const PostPost = async (postdata: any) => {
  const { data } = await axios.post("/api.posts/createPost", postdata);
  return data.post;
};
export const fetchPostComments = async (postId: string) => {
  const { data }: { data: PostComments } = await axios.get(
    `/api/comments/getPostComments?PostId=${postId}`
  );
  return data.PostComments;
};
export const postPostComments = async (content: string) => {
  const { data } = await axios.post("/api/comments/createComment", content);
  return data.comment;
};
export const getOrgStories =async (orgId:string)=>{
  const {data}:{data:OrgStories}= await axios.get(`/api/org/story/getOrgStories?OrgID=${orgId} `)
  return data.stories
}
