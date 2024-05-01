import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../constants/prisma";
import { ApiError } from "../../../../utility/ApiError";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest) {

const reqBody  = await req.json()
const {content} : {content : string} = reqBody
const serachparams = req.nextUrl.searchParams
const commentId =  serachparams.get("comemntId")

if (!commentId) {
    throw new ApiError(400,"searchParams not get Post Id")
    
}
const session  = await getServerSession(authOptions)
if (!session) {
 throw new ApiError(400,"user not found")
}
const user = session?.user


const searchComment = await prisma.comment.findFirst({
    where:{
        id:commentId ,
        authorId :  user.id
    }
})

if (!searchComment) {
    throw  new ApiError(400,"commment not found")
}

const delComment = await prisma.comment.delete({
    where:{
        id:commentId
    }
})

return NextResponse.json({
    message:"comment delete succesfully"
    
})







}
