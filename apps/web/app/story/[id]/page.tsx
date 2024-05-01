"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStory } from '../../../constants/storyQueryFn'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../state/store'
import { inStory } from '../../state/story/storySlice'

interface params{
  id:string
}
function Story({params}:{params:params}) {
  const router = useRouter()
  const dispatch:AppDispatch= useDispatch()
  const {data:story,isFetching}=useQuery({
    queryKey:["story"],
    queryFn:async()=>await getStory(params.id)
  })
  if (isFetching) {
    return <div>Is isFetching</div>
    
  }

  if (!story) {
    return <div> There Is No Story</div>
  }

  const storyDispatch=()=>{
    dispatch(inStory(story))
    router.push("/story/chat")
  }

  return (
  <>
  <div className=' flex flex-row'>
  <div className='h-20 w-screen flex flex-row'>
   <div className='h-20 w-80 text-blue-950  flex flex-row justify-center ml-56'>
    <div ></div>
   </div>
   
   </div>
   <div className='h-screen w-96 mb-8 ml-28 border border-black'>
    <div className='h-40 text-3xl w-full border border-black'>{story.name}{story.org.avatar}</div>
    <div className='h-14 w-14 border border-black rounded-full'>
      <img src={story.org.avatar?story.org.avatar:""} alt="" />
    </div>
   </div>
   </div>
</>
  )
}

export default Story