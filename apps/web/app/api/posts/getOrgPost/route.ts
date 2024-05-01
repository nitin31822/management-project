import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function GET(req:NextRequest) {

    const serachparams = req.nextUrl.searchParams
   const OrgId =  serachparams.get("OrgId")

   if (!OrgId) {
       throw new ApiError(400, "searchParms not get OrgId")
   }
   console.log("orgId by searchParams" , OrgId);
   

   const posts = await prisma.post.findMany({
    where:{
        postOrgID : OrgId
    } ,
    include : {
        likes : true ,
        comments : true
    }
   })
console.log(posts,"posts get  succ");

   return NextResponse.json({
    message:"posts of orgination succesfully",
    posts:posts
   })
    
}