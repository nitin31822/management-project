"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import SendTaskEmployeesCard from "../../../Components/SendTaskEmployeesCard";

function page() {
  const story = useSelector((state: RootState) => state.story.story);
  console.log(story);

  return (
    <main>
      {story?.employees? story.employees.map((user) => (
          <SendTaskEmployeesCard user={user}></SendTaskEmployeesCard>
      )) : null}
    </main>
  );
}

export default page;
