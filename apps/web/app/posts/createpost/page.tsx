"use client"

import axios from 'axios'
import React from 'react'
import {useForm} from "react-hook-form"
import { UseSelector, useSelector } from 'react-redux'
import { RootState } from '../../state/store'

function CreatePost() {
    const {register,handleSubmit} = useForm();
 
 const orgData = useSelector((state:RootState)=>state.org.org)

   
    const onSubmit = async(data:any)=>{
          const formData = new FormData()
          formData.append("image",data.Image)
          console.log(formData);
          

          const res = await axios.post(`/api/posts/createPost?OrgId=661ba2535cb76c2941ec03a2`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(res);
          
    }
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("image")} type="file"  placeholder='Image' />
    <input {...register("Title")} type='text' placeholder='Create Title'/>
    <button>Upload Image</button>

   </form>
  )
}

export default CreatePost