import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../constants/prisma";
import { ApiError } from "../../../../utility/ApiError";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


 export async function POST(req: NextRequest) {
    const reqBody  = await req.json()
    console.log("json ka badd");
    
    const {content} : {content : string} = reqBody
    if (content.trim() === "") {
        throw new ApiError(400 , "content is empty string")
    }

    const serachparams = req.nextUrl.searchParams
    const PostId =  serachparams.get("PostId")

    if (!PostId) {
        throw new ApiError(400,"searchParams not get Post Id")
        
    }
    const searchPost = await prisma.post.findFirst({
        where:{
            id:PostId
        },
       
    })
    if (!searchPost) {
        throw new ApiError(400,"post did not found")
    }

    const session  = await getServerSession(authOptions)
   if (!session) {
    throw new ApiError(400,"user not found")
   }
   const user = session?.user

//  const userID = "65fb01b9900dbfef4bee66d3"

   const createComment = await prisma.comment.create({
    data:{
        post:{
            connect : {
                id : searchPost.id
            }
        } ,
        author : {
            connect : {
                id : user.id
            }
        } ,
        content : content
    } ,
    include : {
        likes : true ,
        author : true ,
        post : true ,
    
    }
   })

   const createdComment = await prisma.comment.findFirst({
  where : {
    id : createComment.id
  }
   })

   if (!createdComment) {
    throw new ApiError(500 , "error while making comment")
   }

   return NextResponse.json({
    message : "comment created succesfully" ,
    comment : createComment ,
    status : true
   })

}