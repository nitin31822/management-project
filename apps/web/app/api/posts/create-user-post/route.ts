import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { UploadApiResponse } from "cloudinary";
import { TakeAndUpload } from "../../../takeAndUpload";

export async function POST(req:NextRequest) {
    // const session = await getServerSession(authOptions)
    // if(!session){
    //     throw new ApiError(400,"session not found")

    // }
    // const user = session.user

    // const finduser = await prisma.user.findFirst({
    //     where:{
    //         id:user.id
    //     }
    // })
    // if (!finduser) {
    //     throw new ApiError(500,"user not found")

    // }
    const userId = "65fb01b9900dbfef4bee66d3"
    const titile = "this is addidas photo"
    const data = await req.formData()
    const FormPhoto : File | null = data.get("image") as unknown as File 
    
    let photo : UploadApiResponse | null = null

    if( FormPhoto){
      photo = await TakeAndUpload(FormPhoto)
      
    }
    
    const createUserPost = await prisma.post.create({
        data: {
            postOwner: {
                connect: {
                    id: userId
                }
            },
            // postOrg: {
            //     connect: {
            //         id: org.id
            //     }
           // },
            photo: photo?.url,
            title:titile
      
        },
        include: {
            likes: true,
            comments: true,
            postOwner: true,
            
           // postOrg: true
        }
    })

    const createdPost = await prisma.post.findFirst({
        where:{
            id:createUserPost.id
        }
    })
    if (!createdPost) {
        throw new ApiError(400,"post not created")
        
    }

    return NextResponse.json({
        message:"user post create succesfully",
        userpost:createUserPost
    })

    
}