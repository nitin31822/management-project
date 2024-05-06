
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface storyIdTypes {
    status : boolean ,
    storyID : string | null
}

const initialState : storyIdTypes = {
    status : false ,
    storyID : null
}

const storyIdSlice = createSlice({
    name : "storyID" ,
    initialState ,
    reducers : {
        storyID : (state , action : PayloadAction<string>) =>{
          state.status  = true ,
          state.storyID = action.payload
        } ,
        outStoryID : (state) =>{
         state.status = false ,
         state.storyID = null
        }
    }
})
export  const {storyID , outStoryID} = storyIdSlice.actions
export default storyIdSlice.reducer
