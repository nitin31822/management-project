import { User } from "@prisma/client"
import {PayloadAction, createSlice} from "@reduxjs/toolkit"

 export interface TaskType {
  content : string ,
  title   : string 
  Manager  : user
}

export interface user {
   avatar : string | null 
   id  : string
   name : string 
   email : string
}

export interface TaskData {
  status : boolean 
  Task :  TaskType| null
 
}

const data : TaskData = {
   status : false ,
   Task : null
}

const TaskSlice = createSlice({
    name : "task" ,
    initialState : data ,
    reducers : {
        newTask : (state , action: PayloadAction<TaskType>) =>{
         state.status = true 
         state.Task = action.payload
        }
    }
})

export const {newTask} = TaskSlice.actions

export default TaskSlice.reducer