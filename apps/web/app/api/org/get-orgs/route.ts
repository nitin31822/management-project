import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../constants/prisma";
import { client } from "../../../../constants/redis";
import { org } from "../../../state/org/orgSlice";
import { Org } from "@prisma/client";
import { ApiError } from "../../../../utility/ApiError";


const rediset = async(orgs:Array<Org> , userEmail:string)=>{

   orgs.map( async(org , count:number)=>{ 
    const hasshkey = `${userEmail}-org:${count+1}`
    await client.hmset(hasshkey  , org, async(err , data)=>{
      if (err) {
        console.log(err); 
      }else{
        console.log(`data is seted with org ${hasshkey}`);
        await client.expire(hasshkey,3600 , (err,data)=>{
          if (err) {
           console.log(err,`data not expired at ${hasshkey}`);
           
          } else {
            console.log(`expire is redy to expire at ${hasshkey}`);
            
          }
        })
          
      }
    }   )
   })
}


export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
      throw new  ApiError(400  , "session not found")
    }
    const user = session?.user

    // const orgs = await prisma.org.findMany({
    //     where : {
    //       owner : {
    //         every : {
    //             id : user.id
    //         }
    //       } ,
    //       employees:{
    //         every:{
    //           id:user.id
    //         }
    //       } 
    //     },
    //     select:{
    //       name:true,
    //       bio:true,
    //       avatar:true,
    //       email:true ,
    //       id : true,
    //       socketRoomName:true,
    //       coverImage:true,
          
    //     }
    // })

    const orgs =await prisma.org.findMany()
    console.log("orgs " , orgs);
    
   // const redis  = await  rediset(orgs, user.email)

    return NextResponse.json({
        message : "User Orgs fetched Successfully",
        orgs : orgs
    })
}