import { NextRequest,NextResponse } from "next/server";

import { ApiError } from "../../../../../utility/ApiError";
import prisma from "../../../../../constants/prisma";


export async function GET(req:NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const orgID = searchParams.get("OrgID");

  if (!orgID) {
    throw new ApiError(500,"org id not found on search params")
    
  }

  const stories = await prisma.story.findMany({
    where: {
      org: {
        every:{
          id: `${orgID}`
        }
      
          
              }
    },
    select:{
      headline:true,
      name:true
    }
  });


  return NextResponse.json({
    message:"storiesFetched",
    stories : stories
  })
    
}