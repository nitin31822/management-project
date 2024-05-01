"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { onlyOrg } from "../../../constants/OrgQueryFN";
import { Org } from "@prisma/client";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../state/store"
import Link from "next/link";
interface Iparams {
  org: string;
}
function org({ params }: { params: Iparams }) {
  // const orgData = useSelector((state:AppDispatch)=>{state.})
  const { data: oorg, isFetching } = useQuery({
    queryKey: ["oorg"],
    queryFn: async () => await onlyOrg(params.org),
  });
  if (isFetching) {
    return <div> Is Fetching</div>;
  }

  if (!oorg) {
    return <div>Something went wrong</div>;
  }
  console.log(oorg.posts);

  return (
    <main className=" h-full w-full flex flex-col gap-3">
      <div className=" h-2/5 w-full">
        <img
          src={oorg.coverImage ? oorg.coverImage : ""}
          alt=""
          className=" h-full  w-full border border-gray-600"
        />
        <div className=" border border-black relative w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 -mt-12 ml-7">
        <img
          src={oorg.avatar? oorg.avatar: ""}
          alt=""
          className=" h-full w-full border border-gray-600"
        />

        </div>
      </div>
   

      <div className="h-10 w-full text-2xl mt-14 flex flex-row items-center gap-12">
        <h1 className=" pl-8">{oorg.name}</h1>
        <Link
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${oorg.email}`}
          className=" text-lg cursor-pointer hover:text-blue-600 hover:underline"
        >
          {oorg?.email}
        </Link>
      </div>
      <div className=" h-30 w-full border border-gray-200 border-dotted">
        {oorg.bio}
      </div>
      <br />

      <div className="h-24 w-64">
        
      </div>
      <br />
      <div>
        <p>Top Posts Of {oorg.name} Organisation</p>
        {oorg.posts.map((post) => (
          <img
            src={post.photo ? post.photo : ""}
            alt=""
            className="w-96 h-48 border border-gray-800 mb-8 mt-8"
          />
        ))}
      </div>

      {/* <div>
        <p>Stories Of {oorg.name} Organisation</p>
        {oorg.story.map((story)=>(
          <div>
            <h1>{story.name}</h1>
            <p>{story.}</p>
            </div>
         
        ))}
      </div> */}
    </main>
  );
}

export default org;
