import { comment } from "@prisma/client"
import axios from "axios"
import { postType } from "../../app/api/posts/get-all-posts/route"

interface createCommentResponse {
    message : string ,
    comment : comment ,
    status : boolean
}
interface toggleLikePostRespone {
    message : string
    isLiked  : boolean
}

interface getPostReturnTYpe {
    message  : string
    post : postType
}

export const createComent = async(postID : string , content : string) => {
    const {data} : {data : createCommentResponse} = await axios.post(`/api/comments/createComment?PostId=${postID}` , {
        content : content
    })
    return data.status
}

export const toggleLikePost  = async(postID : string)=> {
    const {data} : {data : toggleLikePostRespone}  = await axios.post(`/api/likes/ToggleLike?PostId=${postID}`)
    return data.isLiked

} 

export const getPost = async (postId : string) => {
 const {data} : {data : getPostReturnTYpe} = await axios.get(`/api/posts/get-post?postID=${postId}`)
 return data.post
}