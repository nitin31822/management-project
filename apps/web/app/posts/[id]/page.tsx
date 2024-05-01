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
    <main>
      <Post postData={postData}></Post>
    </main>
  );
}

export default page;
