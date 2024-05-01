"use client"
import React, { useState } from 'react'
import { message, useSocket } from '../../socketProvider'
import { useSelector } from 'react-redux'
import { Story } from '@prisma/client'
import { RootState } from '../../state/store'
import {useForm , SubmitHandler} from "react-hook-form"
import { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../../../constants/MessagesQueryFn'
import { useSession } from 'next-auth/react'
import { avatar } from '@nextui-org/react'

 export interface FormData  {
  Message : string
}

function page() {
  const{register,handleSubmit , reset} = useForm<FormData>()
  const {sendMessage,Messages}=useSocket()
  const {data : sessionData} = useSession()

  if (!sessionData) {
    return <div>Please Login to chat with other</div>
  }

  const user = sessionData.user

 


 const storyData  = useSelector((state: RootState) => state.story.story)
 if (!storyData) {
  console.log("there  is no story");
  return
  
 }

 const storyRoomName = storyData.socketRoomName
  
 const {data   , isLoading} = useQuery({
  queryKey : ["messages"] ,
  queryFn : async () => await getMessages(storyRoomName)
})

if (isLoading) {
  return <div>messages Loading</div>
}
 
const sendMessages = async(roomName:string,Message:message)=>{
  const res = await sendMessage(roomName,Message)
}
const onSubmit : SubmitHandler<FormData> = async(data)=>{
  const message : message = {
    content : data.Message ,
    roomName : storyData.socketRoomName ,
    sender : {
      name : user.name ,
      avatar : user.avatar ,
      id : user.id
    }
  }
   await sendMessages(storyRoomName,message)
   reset()
  
}


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Lets Chat With  your Orgination People</h1>

      <div>
           <input  {...register("Message")}type="text" placeholder='Message' />
           <button>SendMessage</button>
      </div>

    
    </form>

    <div>
      {data?.map((message)=>(
        <li>backend wala messages {message.content}</li>
      ))}
    </div>
    <div >
      {Messages.map((e)=>(
        <li>socket wala messages{e.content}</li>
      ))}
    </div>
    </>
  )
}

export default page