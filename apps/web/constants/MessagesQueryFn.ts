import axios from "axios";

export interface Imessgaes{
    content:string
    sender : user
    
}


interface user {
    name : string 
    avatar : string | null ,
    id : string
}

interface ReturnGetMessages {
    message : string ,
    messages : Array<Imessgaes>
}

export const getMessages = async(groupname : string) => {
    const {data} : {data : ReturnGetMessages} = await axios.get(`/api/messages/get-messages?GroupName=${groupname}`)
    return data.messages
}