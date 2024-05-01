"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { getpostCoomments } from "../../../constants/postsQuery";
import { Avatar } from "@nextui-org/react";
import Comments from "./Comments";
import { getPost } from "../../../constants/posts/Post";
import AddComment from "./AddComment";
import { useDispatch } from 'react-redux'
import { AppDispatch } from "../../state/store";
import { useRouter } from "next/navigation";
import { inPost } from "../../state/posts/postSlice";
import { Button } from "../../../@/components/ui/button";



interface params {
  id: string;
}
function page({ params }: { params: params }) {
  const router = useRouter()
  const dispatch:AppDispatch = useDispatch()
 
  const {data : postData , isLoading} = useQuery({
    queryKey : ["post"] ,
    queryFn : async () => await getPost(params.id)
  })
  
  if (isLoading) {
    return <div>Post Loading</div>
  }
  if (!postData) {
    return <div>Something went wrong</div>
  }

  const pushToCommnet = ()=>{ 
    console.log("clicekf");
    
    dispatch(inPost(postData.id))
    router.push(`/posts/${postData.id}/comments`)

  }

  return (
    // <main className="h-[400px] w-full  flex flex-row">
    //   <div className=" w-3/5  h-full">
    //     <img
    //       src={postData?.photo ? postData.photo : ""}
    //       alt="image"
    //       className=" h-full w-full"
    //     />
    //   </div>

    //   <div className=" w-2/5 h-full ">
    //     <div className=" h-1/6 border border-black flex flex-row items-center justify-between">
    //       <div className=" flex flex-row items-center gap-4">
           
    //         <span className=" text-2xl">{postData?.postOwner.name}</span>
    //       </div>
    //       <span className=" mr-3">18 April at 22:09</span>
    //     </div>
    //     <div className=" border border-black flex flex-row items-center justify-around">
    //       <p>Like</p>
    //       <p>Comments</p>
    //       <p>Share</p>
    //     </div>
    //     <div className=" h-3/4 flex flex-col justify-between">
    //       <Comments  />
    //      <AddComment  />
    //     </div>
    //   </div>
    // </main>

    <div className=' w-[300px] h-[550px]  flex flex-col gap-1 border border-white'>
 
   <div className=' flex flex-row  ml-3  items-center gap-4 '>
     <Avatar src={postData.postOwner.avatar ? postData.postOwner.avatar : ""}></Avatar>
   
      <span className=' text-2xl'>{postData?.postOwner.name}</span>
          <span className=' ml-8 text-white'>18 April at 22:09</span>
      </div>
  
    <div className=' h-2/3 w-full border border-red-950 '>

        <img src={postData?.photo ? postData.photo : ""} alt="image" className=' h-full w-full' />
    </div>
    <div className='flex flex-row gap-12 justify-center'>
        <p>Like</p>
      {/* <p onClick={pushToCommnet}>Comment</p> */}
        <Button onClick={pushToCommnet}> Comments</Button>
         <p>Share</p>
    </div>




    </div>
  );
}

export default page;
