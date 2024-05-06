"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../constants/userQueryFn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UseDispatch, useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { login } from "../state/auth/authsclice";
import { User } from "@prisma/client";

function Profile() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  if (!user) {
    return <div>please login</div>
  }
  if (isFetching) {
    return <div>Is Fetching...</div>;

  }

  const postPush = (user: User) => {
    // dispatch(login(user))

    router.push("/posts/user");
  };
  return (
    <>
      <div className="border border-gray-200 h-96 w-screen">
        <div className="h-64 w-2/3 border border-black">
          <img src={user.coverImage ? user.coverImage : ""} alt="" className=" w-full h-full" />
          </div>
        <div className=" border border-black relative w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 -mt-12 ml-7">
          <img src={user.avatar ? user.avatar : "" } alt="" className="w-full h-full" />
        </div>
        <div className=" ml-40 text-2xl mt-1">{user?.name}</div>
        <div className=" ml-3 mb-2 h-5 w-40">
          <Link
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user}`}
            className=" text-lg cursor-pointer hover:text-blue-600 hover:underline"
          >
            {user?.email}
          </Link>
        </div>
        <div className="h-0 w-screen border border-black"></div>

        <div className="text-2xl flex flex-row">
          <Link className="h-8 w-40 " href="/org">
            {" "}
            Organisations
          </Link>
          <Link
            onClick={async () => await postPush}
            className="h-8 w-40"
            href="/posts/user"
          >
            Posts
          </Link>
          <Link className="h-8 w-40" href="/friends">
            Friends
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
