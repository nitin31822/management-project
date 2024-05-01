"use client"
import { Post } from "@prisma/client"
import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { userposts } from "../../../constants/userQueryFn"
import { postType } from "../../api/posts/get-all-posts/route"


export interface post {
   
    status:boolean,
    post:string | null
}

const initialState:post =  {
    status: false,
    post: null,
   
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        inPost:(state,action:PayloadAction<string>)=>{
            state.status=true,
            state.post=action.payload
        },
        notInPost:(state,action)=>{
            state.status=false,
            state.post = null
        }
    }
})
export const {inPost,notInPost}=postSlice.actions
export default postSlice.reducer