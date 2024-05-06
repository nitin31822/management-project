"use client"
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserStories, story, storyType, userStories } from '../../constants/userStoriesFn'

import { useRouter } from 'next/navigation'
import { useSocket } from '../socketProvider'
import { Button } from '../../@/components/ui/button'
import Story from '../../Components/story'
import { Istory } from '../../constants/storyQueryFn'







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
    const visitStory = async(visitStory: story)=>{
      const res = await RoomJoin(visitStory.socketRoomName)
      router.push(`/story/${visitStory.id}`)

    }
  return (
    <main>
    <Button onClick={()=> router.push("/story/create-story/select-org")} className=" bg-white text-xl" >Create Story</Button>
    <div className="flex flex-col gap-5 mt-6">
    {Stories?.map((story) => <Story story={story} />)}
    </div>
    </main>
  )
}

export default page