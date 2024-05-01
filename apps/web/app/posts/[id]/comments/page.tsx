"use client"

import { useQuery } from "@tanstack/react-query"
import { getpostCoomments } from "../../../../constants/postsQuery"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"
import AddComment from "../AddComment"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../@/components/ui/avatar"

const  Comments = ()=>{
    const postId = useSelector((state:RootState)=>state.post.post)
    if (!postId) {
        return <div>postId not add by useSeector</div>
        
    }
    const {data:PostComments,isFetching}= useQuery({
        queryKey:["PostComments"],
        queryFn:async()=> await getpostCoomments(postId)
    })
 

    if (isFetching) {
        return <div>Is fetching...</div>
        
    }
    if (!PostComments) {
        return <div>no post comments</div>
        
    }
    return(
        <>
    <div className=' h-4/5 border overflow-auto'>
    {

     PostComments.map((comment)=>(
       <div className="h-13  flex flex-row gap-4 items-center mt-3" key={comment.content}>
       <div className=" items-center" >
         <Avatar >
            <AvatarImage src={comment.author.avatar ? comment.author.avatar : ""} >

            </AvatarImage>
            <AvatarFallback >CN</AvatarFallback>
         </Avatar>
       </div>
       <div className=" flex flex-col rounded-full bg-slate-200  w-full ">
         <div className=" p-4 ">
           <p className=" text-lg">{comment.author.name}</p>
           <p className=" text-base">{comment.content}</p>
         </div>
       </div>
     </div>
     ))
      
    }
   </div>
       <AddComment />
   </>
    )
}
export default Comments