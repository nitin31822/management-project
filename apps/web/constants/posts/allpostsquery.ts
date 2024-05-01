import axios from "axios";
import { postType } from "../../app/api/posts/get-all-posts/route";
 
interface posts{
    message:string,
    posts:Array<postType>
}

export const getAllPosts = async()=>{
    const{data}:{data:posts} = await axios.get('/api/posts/get-all-posts')
       
        return data.posts
}