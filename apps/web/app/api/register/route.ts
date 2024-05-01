import {NextRequest , NextResponse}  from "next/server";
import prisma from "../../../constants/prisma";
import bcrypt from "bcrypt";
import { ApiError } from "../../../utility/ApiError";


interface user  {
    name: string;
    password : string
    email: string; 
    
}

export async function POST(req : NextRequest) {
    
        
        const reqBody = await req.json()
        const {email  , name  } : user  =  reqBody

        if ([email , reqBody.password , name ].some((field)=> field?.trim() === "")) {
        throw new ApiError(411   , "please Provide us full User information")
        }
      const existedUser = await prisma.user.findFirst({
        where : {
            email : email
        }
      })

      if (existedUser) {
       throw new ApiError(400 , "user with this email already exists" )
      }
      const hashedPassword  = await bcrypt.hash(reqBody.password , 10)

      const newUser = await prisma.user.create({
        data : {
          email : email ,
          password : hashedPassword ,
          name : name,
       
          
        }
      })

      const createdUser = await prisma.user.findFirst({
        where : {
          id : newUser.id
        }
      })

      if (!createdUser) {
        throw new ApiError(500 , "Something went wrong while creating a user ")
      }

      const {password , ...userwithoutPass} = createdUser

    

      return NextResponse.json({message : "user created SuccessFully" , user : userwithoutPass})
 
        
    
}