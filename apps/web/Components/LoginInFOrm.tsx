
"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm  , SubmitHandler} from "react-hook-form"
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
import { login as authLogin } from '../app/state/auth/authsclice';
import { AppDispatch } from '../app/state/store';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react"
import {TLoginSchema , loginSchema} from "../constants/ZodTypes"

function LoginForm() {
    const router = useRouter()
    const dispatch : AppDispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });

      const login : SubmitHandler<TLoginSchema>= async (data) => {
        console.log(data);
        setIsSubmitting(true)
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (!res?.ok) {
          console.log("something went wrong");
          return;
        }
        console.log("login res", res);
        const session =  await getSession() 
        if (!session) {
          return
        }
        const user = session.user
        console.log( user, "session user");
        
        if (!user) {
          return;
        }
        dispatch(authLogin(user));
        setIsSubmitting(false)
        router.push("/");
      };
  return (
    <ShadcnForm {...form}>
    <form onSubmit={form.handleSubmit(login)} className="space-y-8">
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
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter your Password" {...field} className=" h-10" type='password' />
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
                'Sign-In'
              )}
            </Button>
    </form>
  </ShadcnForm>
  )
}

export default LoginForm