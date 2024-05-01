"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../state/store";
import { ApiError } from "../../../../utility/ApiError";


function page() {
  const orgData = useSelector((state: RootState) => state.org.org);
  if (!orgData) {
    return <div>Something Wrong</div>
  }
   const { register, handleSubmit } = useForm();
   const onSubmit= async(data:any)=>{
    const res = await axios.post(`/api/org/story/createStory?OrgId=${orgData.id}`,data)
    console.log(res);
    
   }


  return( 
  <>
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("name")} type="text" placeholder="Enter Story Name" />
    <input {...register("headline")} type="text" placeholder="Enter Headline" />
    <button>Submit</button>
  </form>
  </>
  )
}

export default page;