"use client"
import {useForm} from "react-hook-form"
import { getSession, signIn ,useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { UseDispatch, useDispatch } from "react-redux"
import { login as authlogin } from "../app/state/auth/authsclice"

function LoginForm() {
  const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()
    const router = useRouter()
    
    const login = async(data:any) =>{
    const res = await signIn( "credentials" , {
        redirect : false,
        email : data.email,
        password : data.password
    } )
    if (!res?.ok) {
        console.log("something went wrong");
        return
    }
    const session =  await getSession()
 
     if (!session) {
      return;
    }
    const user = session.user
    dispatch(authlogin(user))
 
    router.push('/')
    }
  return (
    <div>
        <form onSubmit={handleSubmit(login)}>
        <input type="text" {...register("email")} />
        <input type="text" {...register("password")} />
        <button>Login</button>
        </form>
    </div>
  )
}
export default LoginForm