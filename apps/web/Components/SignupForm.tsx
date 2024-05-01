
"use client"
import {
  Form as ShadcnForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/components/ui/form";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm  , SubmitHandler} from "react-hook-form"
import {TsignupSchema , signSchema} from "../constants/ZodTypes"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import { User } from "@prisma/client"
import { login } from "../app/state/auth/authsclice";
import { AppDispatch } from "../app/state/store";
import axios from "axios";

function SignUpForm() {
    const router = useRouter()
    const dispatch : AppDispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TsignupSchema>({
        resolver: zodResolver(signSchema),
        defaultValues: {
          confirmPassword: '',
          email: '',
          password: '',
          name : ""
        },
      });

      const signUP : SubmitHandler<TsignupSchema> = async(data)=>{
       
        setIsSubmitting(true)
          
        const {confirmPassword , ...withoutConfirmPass} = data
        console.log(withoutConfirmPass);
        
 
        const res = await axios.post("/api/register" , withoutConfirmPass)
 
        if (res) {
         const user : User = res.data.user
         const loginUser  = await signIn("credentials" , {
             redirect : false ,
             email : user.email ,
             password : withoutConfirmPass.password
         })
 
         if (!loginUser?.ok) {
             console.log("something went wrong");
             
             return
         }
 
         dispatch(login(user))
 
        }
        console.log(res);
        
        setIsSubmitting(false)
        router.push("/")
        
      }

  return (
    <ShadcnForm {...form}>
    <form onSubmit={form.handleSubmit(signUP)} className="space-y-8">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} className=" h-10" />
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
            <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter you name" {...field} className=" h-10"/>
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
            <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter your Password" {...field} className=" h-10" type="password" />
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
          <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Confirm Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter your Confirm Password" {...field} className=" h-10" type="password"/>
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
            <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
      <Button type="submit" className='w-full bg-white ' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
    </form>
  </ShadcnForm>
  )
}

export default SignUpForm
