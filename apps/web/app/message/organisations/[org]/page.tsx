"use client"
import { useSelect } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { message, useSocket } from '../../../socketProvider'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../../../../constants/MessagesQueryFn'
import {useForm,SubmitHandler} from "react-hook-form"
import { FormData } from '../../../story/chat/page'
import Message from '../../Message'
import { IoSend } from "react-icons/io5";

function page() {
  const {register,handleSubmit,reset}=useForm<FormData>()
  const {sendMessage,Messages}=useSocket()
  const orgData = useSelector((state:RootState)=>state.org.org)
  if (!orgData) {
    console.log("no org found");
    
    return

    
  }
  const session = useSession()
  const user = session.data?.user
  if (!user) {
    return <div>User not Login</div>
    
  }

  const orgRoomName = orgData.socketRoomName
  const {data:messages,isFetching}= useQuery({
    queryKey:["messages"],
    queryFn:async()=>await getMessages(orgRoomName)
  })
  if (isFetching) {
    return <div>Is Fetching...</div>
    
  }
  const sendmessage= async(roomName:string,message:message)=>{
    await sendMessage(roomName,message)
  }

  const onSubmit:SubmitHandler<FormData> =async(data)=>{
    const message : message = {
      content : data.Message ,
      roomName : orgData.socketRoomName ,
      sender : {
        name : user.name ,
        avatar : user.avatar ,
        id : user.id
      }
    }
    await sendmessage(orgRoomName,message)
    reset()
  }

  const allMessages = [...(messages ?? []), ...Messages];
  return (
    // <>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <h1>Lets Chat With  your Orgination People</h1>

    //   <div>
    //        <input  {...register("Message")}type="text" placeholder='Message' />
    //        <button>SendMessage</button>
    //   </div>

    
    // </form>

    // <div>
    //   {messages?.map((message)=>(
    //     <li>backend wala messages {message.content}</li>
    //   ))}
    // </div>
    // <div >
    //   {Messages.map((e)=>(
    //     <li>socket wala messages{e.content}</li>
    //   ))}
    // </div>
    // </>

  //   <div className=" h-full w-full  flex flex-col gap-4 mr-5">
  //   <div className=" h-1/5 w-full border border-black flex flex-row justify-center items-center">
  //     <h1 className=" text-3xl  ">
  //           {orgData.name}
  //     </h1>
  //   </div>

  //   <div className=" h-3/4 border border-black overflow-auto flex flex-col-reverse ">
  //     <div className=" mr-5 ml-5 mt-3">
  //       {allMessages?.map((message) => (
  //         <Message
  //           key={message.content}
  //           message={message}
  //           isOwner={message.sender.id === user.id}
  //         />
  //       ))}
  //     </div>
  //   </div>
  //   <div className="  h-1/6 flex flex-row gap-5">
  //     <form
  //       className=" h-full w-full flex flex-row gap-5"
  //       onSubmit={handleSubmit(onSubmit)}
  //     >
  //       <textarea
  //         className="border border-black h-full w-4/5 resize-none pl-2"
  //         placeholder="Sends a Message"
  //         id=""
  //         cols={3}
  //         rows={1}
  //         {...register("Message")}
  //       ></textarea>
  //       <button>
  //         <IoSend className=" text-3xl" />
  //       </button>
  //     </form>
  //   </div>
  // </div>
  <div className=" h-[520px] w-full  flex flex-col gap-4 mr-5">
  <div className=" h-14 w-full border border-white flex flex-row justify-center items-center">
    <h1 className=" text-3xl text-white ">
          {orgData.name}
    </h1>
  </div>

  <div className=" h-2/3 border border-white overflow-auto flex flex-col-reverse ">
    <div className=" mr-5 ml-5 mt-3">
      {allMessages?.map((message) => (
        <Message
          key={message.content}
          message={message}
          isOwner={message.sender.id === user.id}
        />
      ))}
    </div>
  </div>
  <div className="  h-1/6 flex flex-row gap-5">
    <form
      className=" h-full w-full flex flex-row gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        className="border border-white h-full w-4/5 resize-none pl-2"
        placeholder="Sends a Message"
        id=""
        cols={3}
        rows={1}
        {...register("Message")}
      ></textarea>
      <button>
        <IoSend className=" text-3xl text-white" />
      </button>
    </form>
  </div>
</div>
    )
}

export default page