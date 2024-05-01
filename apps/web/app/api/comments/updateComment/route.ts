// import { NextRequest ,NextResponse } from "next/server";
// import prisma from "../../../../constants/prisma";
// import { ApiError } from "../../../../utility/ApiError";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";


//  export async function name(req:NextRequest) {
//     const reqBody  = await req.json()
//     const {content} : {content : string} = reqBody

//     const serachparams = req.nextUrl.searchParams
//     const PostId =  serachparams.get("PostId")

//     if (!PostId) {
//         throw new ApiError(400,"searchParams not get Post Id")
        
//     }
//     const searchPost = await prisma.post.findFirst({
//         where:{
//             id:PostId
//         },
       
//     })
//     if (!searchPost) {
//         throw new ApiError(400,"post did not found")
//     }

    
//     const session  = await getServerSession(authOptions)
//    if (!session) {
//     throw new ApiError(400,"user not found")
//    }
//    const user = session?.user
   

//    const updateComment = await prisma.comment.update({
//    where:{
//     postID:searchPost.id,
//     content:content
    
//    },
   
//    })

// }