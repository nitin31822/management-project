"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../../constants/posts/Post";
import Post from "../../../Components/Post";

interface parmas {
  id: string;
}

function page({ params }: { params: parmas }) {
  const { data: postData, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => await getPost(params.id),
  });

  console.log(postData);

  if (isLoading) {
    return <div>Post Loading</div>;
  }

  if (!postData) {
    return <div> Something went wrong</div>;
  }

  return (
    <main className=' lg:w-full lg:h-[400px] lg:flex lg:flex-row lg:justify-center lg:items-center ' >
    <div className=' lg:w-1/2  lg:flex lg:flex-row lg:justify-center '>
    <Post postData={postData} ></Post>
    </div>
   </main>
  );
}

export default page;
