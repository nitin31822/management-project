"use client"
import React from 'react'
import { IoSend } from "react-icons/io5";
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from "react-hook-form"
import { createComent } from '../../../constants/posts/Post';
import { useQueryClient } from '@tanstack/react-query';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';

interface FormType {
    content  : string
}

function AddComment() {
    const postID = useSelector((state : RootState)=> state.post.post)
    if (!postID) {
    return <div>Something went wrong</div>
    }
    const {register , handleSubmit , reset} = useForm<FormType>()
    const queryClient = useQueryClient()
    const {
        mutate  ,
        isPending , 
        data
    } = useMutation({
        mutationFn : async(data : string) => await createComent(postID , data ) ,
        onSuccess : () => {
       queryClient.invalidateQueries({queryKey : ["PostComments"]})
        }
    })

    if (isPending) {
        return <div>creating comment</div>
    }
    
    console.log("data" , data);
    
    const create : SubmitHandler<FormType> = (comingdata) => {
        console.log("clicked ");
        console.log(comingdata);
        
         mutate(comingdata.content)
         reset()
    }

  return (
    <div className="border h-1/5 border-black flex flex-row items-center gap-6">
        <form onSubmit={handleSubmit(create)} className=' h-full w-full flex flex-row items-center gap-6' >
        <textarea  className="border border-black h-full w-4/5 resize-none pl-2"  placeholder="Add Your Comment Here" {...register("content")} id="" cols={3} rows={1}></textarea>
        <button type='submit' >
         <IoSend className=" cursor-pointer text-2xl"  />
         </button>
        </form>
          </div>
  )
}

export default AddComment