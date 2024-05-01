"use client"
import React from 'react'
 import { useQuery } from '@tanstack/react-query'
 import { postFetch } from '../../../../constants/OrgQueryFN'
import { Post, comment, like } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import postSlice, { inPost } from '../../../state/posts/postSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../state/store'
    

interface Iparams {
    id : string
}

function page({params} : {params : Iparams}) {
  const dispatch : AppDispatch  = useDispatch()
  const router = useRouter()

  const {data:posts,isFetching}= useQuery({
    queryKey : ["posts"] ,
    queryFn  :async()=>await postFetch(params.id)
   }
  )
  if (isFetching) {
         return <div>isFetching</div>
     }
     console.log("query data" , posts);
 const visitPostComments = (visitPost:any)=>{
  
router.push(`/comments/${visitPost.id}`)


 }
     
  return (
    <>
    <p>Posts of This Organistaion</p>
    {posts?.map((post)=>(
      <div>
      <div>
       {post.comments.map((comment ) => (
        <p>{comment.content}</p>
       ))}
      </div>
      
      <div className='group border-solid border-2 hover:border-black h-64 w-80'>
        <div>
        
        </div>
        <img src={post.photo ? post.photo : ""} alt="" />
      
        <button className="bg-red-500 border-b-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Like
       </button>
      
        <button onClick={()=>{visitPostComments(post)}} className="bg-red-500 border-b-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
         comments
       </button>


      </div>
      </div>
    

    ))}
    </>
  )
}

export default page