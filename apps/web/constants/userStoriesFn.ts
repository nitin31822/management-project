import axios from "axios";

interface employees{
    name:string
    avatar:string
}
interface  manager{
    name:string
    avatar:string
}
interface reciever{
    name:string
    avatar:string
}
interface sender {
    name:string
    avatar:string

}
interface tasks{
    isCompleted:boolean
    reciever:Array<reciever>|null
    sender:sender|null
    content:string
    title:string
    taskSocketRoom:string

}
 interface story{
    name: string
    employees:Array<employees>
    manager:manager|null
    Tasks:Array<tasks>
    id:string
    headline:string
    socketRoomName:string
}
export interface storyType{
    message:string
    Stories:Array<story>
}



 export interface userStories {
    name : string ,
    id : string ,
    headline : string ,
    socketRoomName : string
}
export interface ReturnUSerStories {
    message : string 
    Stories  : Array<userStories>
}
export async function getUserStories() {
    const {data}:{data:ReturnUSerStories} = await axios.get('/api/org/story/getUserStories')
    return data.Stories
    
}

