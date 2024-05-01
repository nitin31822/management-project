"use client"
import { Org } from "@prisma/client";
import { createSlice  , PayloadAction} from "@reduxjs/toolkit";
import { orgType } from "../../../constants/OrgQueryFN";

export interface org {
    status : boolean ,
    org : orgType | null
}

const initialState : org = {
    status : false ,
    org : null
}

const orgSlice = createSlice({
    name : "org" ,
    initialState ,
    reducers : {
        inorg : (state  , action:PayloadAction<orgType>) =>{
            state.status = true ,
            state.org = action.payload
        } ,
        outoforg : (state) =>{
            state.status = false ,
            state.org = null
        }
    }
}) 
export const {inorg , outoforg} = orgSlice.actions

export default orgSlice.reducer