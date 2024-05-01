"user client"

import { Story } from "@prisma/client"
import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { Istory } from "../../../constants/storyQueryFn"

export interface story {
    status:boolean,
    story:Istory | null
}

const initialState:story={
       status:false,
       story:null

}
const storySLice = createSlice({
    name:"story",
    initialState,
    reducers:{
        inStory:
            (state,action:PayloadAction<Istory> )=>{
                state.status=true,
                state.story = action.payload
            },
            outOfStory:(state)=>{
                state.status = false,
                state.story = null
            }
        
    }
})

export const { inStory,outOfStory} = storySLice.actions


export default storySLice.reducer