"use client"

import { comment } from "@prisma/client"
import axios from "axios"
import { promises } from "dns"
import React, { useCallback, useContext } from "react"

interface ProviderProps {
    children : React.ReactNode
}

interface createCommentResponse {
    message : string ,
    comment : comment ,
    status : boolean
}
interface toggleLikePostRespone {
    message : string
    isLiked  : boolean
}

interface IContext {
    createComment : (postID : string , content : string) => Promise<boolean>
    // getComments   : (postId : string) =>  Promise<Array<comment>> 
    // updateComment : (postID : string , content : string) => Promise<boolean>
    // toggleLikeComment : (commentID : string) => Promise<boolean>
    toggleLikePost  : (postID : string) => Promise<boolean>
    // getPostLikes  :   (postId  : string) => 
}

const socialContext = React.createContext<IContext | null>(null)

export const useSocial = () => {
    const state = useContext(socialContext)
    if (!state) throw new Error("state not defined")

        return state;
}

export const socialProvider : React.FC<ProviderProps> = ({children}) => {

    const createComment : IContext["createComment"] = async(postID  , content)=>{
        
    } 

    const toggleLikePost : IContext["toggleLikePost"] =async(postID)=> {
        const {data} : {data : toggleLikePostRespone}  = await axios.post(`/api/likes/ToggleLike?PostId=${postID}`)
        return data.isLiked

    } 

    return(
        <socialContext.Provider value={{createComment  ,toggleLikePost}}>
            {children}
        </socialContext.Provider>
    )
}