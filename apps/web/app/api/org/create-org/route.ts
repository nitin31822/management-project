import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import {getServerSession} from "next-auth"

import prisma from "../../../../constants/prisma";
import { Socket, io } from "socket.io-client";
import { UploadApiResponse } from "cloudinary";
import { TakeAndUpload } from "../../../takeAndUpload";

interface reqBody {
    name : string
    email : string
}
interface AcknowledgementResponse {
    status: boolean;

}



export async function POST(req : NextRequest ) {
 //   const reqBody = await req.json()
    //const {name , email}: reqBody = reqBody

   // if ([name , email].some((field)=> field.trim() === "") ) {
    //    throw new ApiError(411 , "name and code of school empty ! Please Provide full required information" )
   // }

//    const session = await getServerSession(authOptions)
//    if (!session) {
//     throw new ApiError(404 , "User Session not found ! Firstly Login a User")
//    }
//    const user = session?.user
const name = "adidas2"
const email = "11adidas2@gmail.com"
   const userID = "660ce6d68f9814e295b498ec"
   const dbSchoolName = `${userID}_${name}`
  

   const verfiySchoolName = await prisma.org.findFirst({
    where : {
        dbOrgName : dbSchoolName
    }
   })

   if (verfiySchoolName) {
    throw new ApiError(400 , "User already make a school with this name")
   }
   const data = await req.formData()
   const FormPhoto : File | null = data.get("image") as unknown as File 
  
  

    let coverImage: UploadApiResponse | null = null

    if( FormPhoto){
      coverImage= await TakeAndUpload(FormPhoto)
      
    }
    let avatar: UploadApiResponse | null = null
    
    if( FormPhoto){
        avatar= await TakeAndUpload(FormPhoto)
        
      }

 
   

   
  
    
    let socketRoomName  = `${userID}_${name}` ;

//   const response:AcknowledgementResponse = await socket.emitWithAck("joinRoom" , socketRoomName)

//   const status = response.status
//   if ( status === false) {
//    throw new ApiError(500 , "cannot connect with Room")
    
//   }
//   console.log(response.status);
  

   const bio = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"
  
   const newSchool = await prisma.org.create({
    data : {
        name : name ,
      dbOrgName : dbSchoolName ,
        socketRoomName : socketRoomName,
        email:email ,
        coverImage:coverImage?.url,
        avatar:avatar?.url,
        bio:bio,
       owner : {
        connect : {
            id : userID
        }
       }

    } ,
    include: {
        owner : true
    }
   })

   const createdSchool = await prisma.org.findFirst({
    where : {
        id : newSchool.id
    }
   })

   if (!createdSchool) {
    console.log("org not created");
    
    throw new ApiError(500 , "story not created")
   }
   return NextResponse.json({
    message : "org created Successfully" ,
    org : newSchool
   })

}