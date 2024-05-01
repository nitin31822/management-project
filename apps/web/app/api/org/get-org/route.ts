import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import { Prisma } from "@prisma/client";
import prisma from "../../../../constants/prisma";

export async function GET(req: NextRequest) {
  const serachparams = req.nextUrl.searchParams;
  const OrgId = serachparams.get("OrgId");
  if (!OrgId) {
    throw new ApiError(400, "OrgId not Found");
  }

  const findOrg = await prisma.org.findFirst({
    where: {
      id: OrgId,
    },
    select: {
      name: true,
      bio: true,
      email: true,
      avatar: true,
      coverImage: true,
      posts: {
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          comments: {
            select: {
              content: true,
              author: {
                select: {
                  name: true,
                  avatar: true,
                },
              },
            },
          },

          likes: {
            select: {
              likedBy: {
                select: {
                  name: true,
                  avatar: true,
                },
              },
            },
          },
          photo: true,
          title: true,
          videoFile: true,
          id: true,
          postOwner: {
            select: {
              name: true,
              avatar: true,
            },
          },
          impressions: true,
          videoDuration: true,
        },
        where: {
          isActive: true,
        },
      },
      story: {
        select: {
        //   org: {
        //     select: {
        //       name: true,
        //     },
        //   },
          name: true,
          employees: {
            select: {
              name: true,
              avatar: true,
            },
          },
          manager: {
            select: {
              name: true,
              avatar: true,
            },
          },
        socketRoomName:true,
       id:true },
      },
      id: true,
    },
  });
  if (!findOrg) {
    throw new ApiError(400, "org not found");
  }
  console.log("type");

  //    export const findOrgType =  typeof findOrg

  return NextResponse.json({
    message: "only org get Succesfully",
    oorg: findOrg,
  });
}
