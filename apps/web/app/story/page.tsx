"use client"
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserStories, storyType, userStories } from '../../constants/userStoriesFn'
import { Story } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useSocket } from '../socketProvider'





function page() {
  const router = useRouter()
  const { joinRoom } = useSocket();
  const RoomJoin = async (roomName: string) => {
    const res = await joinRoom(roomName);
    console.log(`join Room Response ${res} `);
    return res;
  };
    const {data:Stories,isFetching}= useQuery({
        queryKey:['Stories'],
        queryFn:getUserStories

    })
    if (isFetching) {
        return <div>Is Fetching...</div>
        
    }
    const visitStory = async(visitStory: userStories)=>{
      const res = await RoomJoin(visitStory.socketRoomName)
      router.push(`/story/${visitStory.id}`)

    }
  return (
    <>
    <div className='flex'>
        <Link className='h-8 w-28 border border-orange-500 ' href="/story/select-org">Create Story</Link>
        <Link className='h-8  w-16   flex-1  ml-64' href="/story/select-org-to-watch-stories">Check Org Stories</Link> 
    </div>
    <h1 className='mt-3'>All The Stories Of The User</h1>

   {Stories?.map((story)=>(
    <div onClick={()=>{visitStory(story)}} className='group border-solid border-2 hover:border-black  h-28 w-screen mt-2'>

      <div className='h-12  w-96 mt-2'>
      <h1 >{story.name}</h1>  

      </div>
      <h1 className='mt-2'>{story.headline}</h1> 

      
    

      
    </div>
   
   ))}

   <div>
   
    </div>
    </>
  )
}

export default page