"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../constants/posts/allpostsquery'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { postType } from '../api/posts/get-all-posts/route';
import { AppDispatch } from '../state/store';
import { useDispatch } from 'react-redux';
import { inPost } from '../state/posts/postSlice';
import { useQueryClient } from '@tanstack/react-query';

function page() {
  const router = useRouter()
  const querClient = useQueryClient()
  const dispatch : AppDispatch = useDispatch()
  const {data:posts,isFetching}=useQuery({
    queryKey:["posts"],
    queryFn: async () => await getAllPosts()
  })
  if (isFetching) {
    return <div>Is Fetching...</div>
    
  }
  if (!posts) {
    return <div>posts nahi hai</div>
  }

  const pushToPost =async (post : postType) =>{
     await querClient.invalidateQueries({queryKey : ["post"], exact: true})
    await querClient.invalidateQueries({queryKey : ["PostComments"], exact: true})
    dispatch(inPost(post.id))
    router.push(`/posts/${post.id}`)
  }


  
  return (
    //   <>
    //   <h1>Posts</h1>

    //   {posts?.map((post)=>(

    //     <div className='flex flex-grow  w-screen'>
         
        
    //     <div  className=' border border-blue-100 cursor-pointer   h-72 w-72'>
    //     <div className=' ml-4 h-1/5 flex flex-row gap-10 items-center'>
          
    //         <p className=' text-lg'>{post.postOwner.name}</p>
    //     </div>
    //     <div className=' h-2/3  w-full '>
    //         <img src={post.photo ? post.photo : ""} alt="" className=' w-full h-full' />
    //     </div>
    //     {/* <div className= ' mt-2  ml-4 flex flex-row justify-between  '>
    //        <button  className=' flex flex-row' > Like </button>
    //        <button className=' mr-32'>comments</button>
    //       </div> */}
    // </div>
    // </div>
        
    //   ))}
    
    //   </>
    <div className="gap-8 grid grid-cols-1 sm:grid-cols-3 h-3/4 overflow-auto">
    {posts.map((item, index) => (
      <Card shadow="sm" key={index} isPressable onClick={() => pushToPost(item)} className=' rounded-lg'>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.title ? item.title : "image"}
            className="w-full object-cover h-[200px]"
            src={item.photo ? item.photo  : ""}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          < b className=' ml-4'>{item.postOwner.name}</b>
         
          <p className="text-default-500  mr-4">18 April at 22:09</p>
          
        </CardFooter>
      </Card>
    ))}
  </div>

  )
}

export default page