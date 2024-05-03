"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../constants/posts/allpostsquery'

import { useRouter } from 'next/navigation';

import Post from '../../Components/Post';
import { Button } from '../../@/components/ui/button';

function page() {
  const router = useRouter()
  const {data,isFetching}=useQuery({
    queryKey:["posts"],
    queryFn: async () => await getAllPosts()
  })
  if (isFetching) {
    return <div>Is Fetching...</div>
    
  }
  if (!data) {
    return <div>posts nahi hai</div>
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
    
  //   //   </>
  //   <main className=" flex flex-col gap-4">
  //   <Button onClick={()=> router.push("/posts/createpost")} className=' bg-white'> Create Post </Button>
  // {data.posts.map((post)=> <Post  postData={post} key={post.post.id} ></Post>)}
  // </main>
  <main className=" flex flex-col gap-4 ">
      <Button onClick={()=> router.push("/posts/createpost")} className=' bg-white lg:w-1/3 lg:text-xl'> Create Post </Button>
    {/* {data.posts.map((post)=> <Post  postData={post} key={post.post.id} ></Post>)} */}

    <div className=" flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
        {data?.posts.map((post) => <Post postData={post}></Post>)}
      </div>
    </main>

  )
}

export default page