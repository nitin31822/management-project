"use client"
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getuserPosts } from '../../../constants/userQueryFn'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useSocial } from '../../Like&CommentProvider'
import { toggleLikePost } from '../../../constants/posts/Post'
import PostPage from '../../../constants/PostPage'

function UserPosts() {
  const router = useRouter()





  const {data:posts,isFetching}=useQuery({
    queryKey:["posts"],
    queryFn:getuserPosts
  }) 
  if (isFetching) {
    return <div>Is Fetching...</div>
    
  }

 
 
  
  return (
    
 <>
 <h1>posts of the user</h1>
 

 {posts?.map((post)=>(

  
  <PostPage post={post} />

 
  

 ))}
   
    
  </>
  )
}

export default UserPosts