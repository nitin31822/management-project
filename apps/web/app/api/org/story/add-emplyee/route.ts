import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../constants/prisma";
import { Story, User } from "@prisma/client";
import { ApiError } from "../../../../../utility/ApiError";
import { io } from "socket.io-client";
import { FaAws } from "react-icons/fa";

interface AcknowledgementResponse {
    status: boolean;
  
  }

export async function POST(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const storyID = searchParams.get("storyID")

    if (!storyID) {
        throw new ApiError(400 , "cannot get StoryID by searchPArmas")
    }

    const story  = await prisma.story.findFirst({
        where : {
            id : storyID
        }
    })
    
    if (!story) {
        throw new ApiError(400 , "cannot find story ")
    }

    const employeeID = searchParams.get("employeeID")
    if (!employeeID) {
        throw new ApiError(400 , "cannot get employeeId ")
    }
    
    const employee  = await prisma.user.findFirst({
        where: {
            id: employeeID
        },
        
    })

    if (!employee) {
        throw new ApiError(404, "Employee not found")

    }
    console.log(employee);

    // const cookieStore = cookies();

    // const cookieValue = cookieStore.get("roomName");

   




    


   

    

//  const res : AcknowledgementResponse = await socket.emitWithAck("joinRoom" , storyRoomName)

//  if (res.status === false) {
//     throw new ApiError(500 , "Cannot connect with Room ")
//  }

    const addEmployee: Story = await prisma.story.update({
        where: {
            id: story.id
        },
        data: {
            // emplyeeID : {push : employeeID},
           employees : {
            connect : {
                id : employeeID
            }
           }




        },
        include: {
          employees : true ,
            manager: true
        }
    })
    console.log("add employee", addEmployee);





    return NextResponse.json({
        updated: "updated",
      
        updatedStory: addEmployee
    });

}
