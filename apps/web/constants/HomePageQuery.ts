import axios from "axios"
import { postType } from "../app/api/posts/get-all-posts/route"

interface Taskk {
    story : taskStory 
    isCompleted : boolean
    sender : sender ,
    title : string ,
    content : string ,
    createdAt : Date
  }
  
  interface taskStory {
    socketRoomName : string ,
      name : string ,
  
  }
  
  interface sender {
    avatar : string | null 
    name : string
  }
  

  interface REturnTypeHomePage {
    message : string 
    tasks  : null | Array<Taskk> 
    posts  : Array<postType>
  }

export const HoemPageQuery = async () => {
    const {data} : {data : REturnTypeHomePage} = await axios.get("/api/homepage")
    return data
}