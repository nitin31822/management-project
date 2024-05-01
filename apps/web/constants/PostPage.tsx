import React  , {useEffect, useState}from 'react'
import { userposts } from './userQueryFn'
import { toggleLikePost } from './posts/Post'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Post, comment } from '@prisma/client'
import { inPost, post } from '../app/state/posts/postSlice'
import { postType } from '../app/api/posts/get-all-posts/route'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/state/store'

function PostPage({post } : {post : userposts}) {
    const {data} = useSession()
    const router = useRouter()
    const dispatch:AppDispatch = useDispatch()
  //   const [liked , setLiked] = useState(false)
  //   const user = data?.user
  //   console.log(user);
    
  //   if (!user) {
  //       return <div>user nahi hai</div>
  //   }
   

  //   const Like = async(postID : string) => {
  //     const res =  await toggleLikePost(postID)
  //     return res
      
  //    }
  //  useEffect(()=>{
  //   console.log("useeffect chala");
    
  //   post.likes.map((like)=>{
  //       if (like.likedByID === user.id) {
  //           console.log("if chala");
            
  //           setLiked(true)
  //           return
  //       }else{
  //         setLiked(false)
  //       }
  //   })
  //  } , [Like])

  const visitpost = (visitpost:userposts)=>{
    dispatch(inPost(visitpost))
    router.push(`/posts/${visitpost.id}`)
  }

  return (
    <div onClick={()=>{visitpost(post)}} className='h-64 w-72 border mb-12 border-black'>
    <div className='flex flex-row'>
        <img src={post.postOwner.avatar?post.postOwner.avatar:""} alt="" className="  h-8 w-8 rounded-full border border-gray-600" />
     <p className='ml-2'>{post.postOwner.name}</p>
     </div>


    <img src={post.photo?post.photo:""} alt="" className=" mt-1 h-44 w-full border border-gray-600" />
    <div className='flex flex-row'>
      <button className=' ml-3 h-5 w-12' >comments</button>
 
      
    </div>
  </div>
  )
}

export default PostPage