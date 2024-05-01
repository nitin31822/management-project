import {z} from "zod"

export const  signSchema = z
.object({
    email : z.string().email("please enter valid email"),

    name : z.string()
    .min(3,"name required atleast 3 characters")
    .max(30,"name only contains 30 characters"),

    password : z.string()
    .min(8,"password required atleast 8 characters")
    .max(20,"password only containes 20 characters "),

    confirmPassword : z.string(),
})
.refine((data)=>data.password===data.confirmPassword,{
    message:"your password and confirm password not matched ",
    path : ["confirmPassword"] 
})

  export type TsignupSchema  = z.infer< typeof signSchema>


