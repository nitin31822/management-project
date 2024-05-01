 import axios from "axios";
// import prisma from "./prisma";
interface reciver{
    name:string,
    avatar:string|null

}
interface sender{
    name:string,
    avatar:string|null
}

interface Tasks{
    reciver:Array<reciver>|null
    sender:sender|null
    title:string


}
interface org{
    name:string
    avatar:string|null
}
interface employees{
    name:string,
    avatar:string|null

}
interface   manager{
    name:string,
    avatar:string|null

}
 export interface Istory{
    name:string,
    headline:string,
    employees:Array<employees>,
    manager:manager,
    Tasks:Array<Tasks>
    socketRoomName : string
    orgId:string
    id:string
    org:org
}
export interface storyType{
    message:string,
    story:Istory
}

export const getStory=async(StoryId:string)=>{
    const {data} :{data:storyType}= await axios.get(`/api/org/story/getStory?StoryId=${StoryId}`)
    return data.story
}




// export const post  = async(storyDAta:any)=>{
//     const {data} = await axios.post("/api/org/story/createStory",storyDAta)
//     return data.stories
    
// }