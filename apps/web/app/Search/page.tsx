// "use client"
// import React, { useState } from 'react'
// import {useForm} from "react-hook-form"
// import { SearchStory } from '../../constants/StoryQueryFN'
// import { Story } from '@prisma/client'
// import axios from 'axios'
// import { AppDispatch } from '../../store/store'
// import { useDispatch } from 'react-redux'
// import { inStory } from '../../store/story/StorySlice'
// import { useRouter } from 'next/navigation'

// function Search() {

//   const [Story , setStroy] = useState<Story>()
//   const router = useRouter()
//   const dispatch : AppDispatch = useDispatch()

//   const Search =async (data : any) =>{
//     const name = data.input

//     const story =  await SearchStory(name)
//     setStroy(story)
//   }

//   const add = async () =>{
//    const {data} =  await axios.post("/api/org/story/add-emplyee" ,{
//       employeeID : "65f2870ced730ac48063c236"
//     })

//     if (!Story) {
//       console.log("story nahi hai");
//       return
//     }
//     console.log(Story);
    
//    dispatch(inStory(Story))
//    router.push(`/story/${Story.id}`)
     
//   }


  

//   const {register , handleSubmit} = useForm()

//   return (
//     <>
//     <form  onSubmit={handleSubmit(Search)}>
//    <input type="text"  placeholder='enter story Name' {...register("input")}/>
//    <button>Search</button>
//    </form>

//    <button onClick={add}>{Story?.name}</button>
  
//    </>
//   )
// }

// export default Search