"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import { post } from "../../../constants/OrgQueryFN";
import { useRouter } from "next/navigation";


function page() {
  const { register, handleSubmit } = useForm();
  const queryClient  = useQueryClient()
  const router = useRouter()

  const {mutate : createOrg , isPending } = useMutation({
    mutationFn : post,
    onSuccess : () =>{
      queryClient.invalidateQueries({queryKey : ["orgs"]})
    }
  })
  const onSubmit =  async(data:any) => {
  createOrg(data)
   
  };

  if (isPending) {
    return <div>Pending...</div>

  }



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} placeholder="enter Name" />
        <input type="text" {...register("email")} placeholder="enter Email" />

        <button>click</button>
      </form>
     
    </div>
  );
}

export default page;
