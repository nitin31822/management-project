"use client"
import React from 'react'
import TaskCard from '../../../Components/TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Button } from '../../../@/components/ui/button';
import Link from 'next/link';
import { useSocket } from '../../socketProvider';

function StoryTasks() {
  const story = useSelector((state : RootState)=> state.story.story)
  const user  = useSelector((state : RootState)=> state.auth.user)
  const {Tasks} = useSocket() 
  console.log(Tasks);
  
  if (!user) {
    return <div>Please Login</div>
  }
  if (!story) {
    return <div>Story nahi hai</div>
  }
  console.log("story" , story);
  
   
  
    
  return (
  
    <main className=' flex flex-col gap-3'>
      {story.manager.id === user.id ?   <Link href="/task"><Button  size={'lg'} className='bg-green-500 lg:w-1/3 text-xl'> Send Task</Button></Link>  : null}
    
   
        <div className=' flex flex-col gap-3'>
        {Tasks.map((task)=>(
          <TaskCard task={task}/>
        ))}
        </div>
    </main>
  
  )
}

export default StoryTasks