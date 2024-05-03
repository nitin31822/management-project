"use client"
import React , {useState} from 'react'
import { postInterface , postType } from '../app/api/posts/get-all-posts/route'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { toggleLikePost } from '../constants/posts/Post'

function Post({postData} : {postData : postInterface}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  console.log("postData" , postData);
  const [isLiked , setIsLiked] = useState(postData.isLiked)
 
  

  const pushToPost = async () => {
    await queryClient.invalidateQueries({queryKey : ["post"] , exact : true })
    await queryClient.invalidateQueries({queryKey : ["post-comments"] , exact : true})
    router.push(`/posts/${postData.post.id}`)
  }

  const togglelike = async() => {

     const likeStatus =   await toggleLikePost(postData.post.id)
     console.log("like Status" , likeStatus);
    if (likeStatus !== null) {
      setIsLiked(likeStatus)
    }
  }

  return (
    <div  className=' h-[300px] w-full border border-white'>
        <div className=' h-1/6 flex flex-row justify-center gap-12  items-center'>
          <h2 className=' text-white'>  {postData.post.postOwner.name}</h2>
          <p className=' text-white'>18 Aprail 22:09</p>
             </div>

           <div onClick={async()=> await pushToPost() } className=' cursor-pointer h-2/3 w-full'>
            <img src={postData.post.photo ? postData.post.photo : ""} alt="" className=' h-full w-full'  />
            </div> 

           <div className=' h-1/6 w-full flex flex-row justify-center gap-5  items-center' >
            <p onClick={togglelike}  className=' cursor-pointer text-white'>{isLiked ? "Liked" : "Like"}</p>
            <p className=' text-white'>Comments</p>
            <p className=' text-white'>Share</p>
            </div>  
    </div>
  )
}

export default Post