"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getpostCoomments } from '../../../constants/postsQuery';
import { Avatar } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';


function Comments() {
  

  const postID = useSelector((state : RootState)=> state.post.post)
  if (!postID) {
    return <div>Something went wrong</div>
  }
  
    const { data: PostComments, isFetching } = useQuery({
        queryKey: ["PostComments"],
        queryFn: async () => await getpostCoomments(postID),
      });
      if (isFetching) {
        return <div> comments Fetching...</div>;
      }
      console.log(PostComments);
      
  return (
    <div className=" h-3/4 border overflow-auto">
            {PostComments?.map((comment) => (
              <div className="h-13  flex flex-row gap-4 items-center mt-3">
                <div className=" items-center">
                  <Avatar
                    src={comment.author.avatar ? comment.author.avatar : ""}
                  ></Avatar>
                </div>
                <div className=" flex flex-col rounded-full bg-slate-200  w-full ">
                  <div className=" p-4 ">
                    <p className=" text-lg">{comment.author.name}</p>
                    <p className=" text-base">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default Comments