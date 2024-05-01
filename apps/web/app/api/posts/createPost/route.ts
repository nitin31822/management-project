import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse , NextRequest} from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { TakeAndUpload } from "../../../takeAndUpload";
import { UploadApiResponse } from "cloudinary";
import { connect } from "http2";
import { text } from "stream/consumers";


 export async function POST(req:NextRequest) {
      
    const session =  await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400,"pls login or signup")
        
    }

  const user = session.user
    const serachparams = req.nextUrl.searchParams
    const OrgId =  serachparams.get("OrgId")

    if (!OrgId) {
        throw new ApiError(400, "searchParms not get OrgId")
    }
//   const userId = "65fb01b9900dbfef4bee66d3"
    const org = await prisma.org.findFirst({
        where:{
            id:OrgId
        }
    })

    if (!org) {
        throw new ApiError(400,"Org not found")
    }
    const data = await req.formData()
   const FormPhoto : File | null = data.get("image") as unknown as File 
  
  

    let photo : UploadApiResponse | null = null

    if( FormPhoto){
      photo = await TakeAndUpload(FormPhoto)
      
    }
    

    const newPost = await prisma.post.create({
        data: {
            postOwner: {
                connect: {
                    id: user.id
                }
            },
            postOrg: {
                connect: {
                    id: org.id
                }
            },
            photo: photo?.url
      
        },
        include: {
            likes: true,
            comments: true,
            postOwner: true,
            postOrg: true
        }
    });

    const cretedPostCheck = await prisma.post.findFirst({
        where:{
            id:newPost.id
        }
    })
    if (!cretedPostCheck) {
        throw new ApiError(400,"post not created")
    }

  return  NextResponse.json(
        {
            post:newPost
        }
    )
    
 }

