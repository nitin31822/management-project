import axios from "axios";
import { postInterface, postType } from "../../app/api/posts/get-all-posts/route";
 
interface posts{
    message:string,
    posts:Array<postInterface>
}

export const getAllPosts = async()=>{
    const{data}:{data:posts} = await axios.get('/api/posts/get-all-posts')
       
        return data
}