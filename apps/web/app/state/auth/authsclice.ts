"use client"
import { User } from "@prisma/client"
import  {createSlice , PayloadAction} from "@reduxjs/toolkit"

export interface auth{
   status : boolean
   user : User | null

} 
const initialState : auth = {
    status:false,
    user : null
}
const authSlice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{
    login:(state,action:PayloadAction<User>)=>{
        state.status=true,
        state.user = action.payload
    },
    logOut:(state)=>{
        state.status = false
        state.user = null
    }
    },
    

})

export const {login,logOut} = authSlice.actions
export default authSlice.reducer
