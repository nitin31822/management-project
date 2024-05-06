

"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppDispatch,RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { TaskType,newTask,user } from "../state/task/taskSlice";

import { title } from "process";

interface FormType {
  title: string;
  content: string;
}

function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
 
if (!userData) {
  return <div>Please Login</div>
}

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);

    const Manager : user = {
      avatar : userData.avatar ,
      email : userData.email ,
      id : userData.id ,
      name : userData.name
    }
    const ReduxTask : TaskType = {
      content : data.content ,
      title   : data.title ,
      Manager  : Manager
    }
    dispatch(newTask(ReduxTask));
    
    router.push("/task/select-members");
    reset();
  };
  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-gray-100 rounded-md ">
      <h1 className="text-2xl font-bold mb-4">Create a Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="taskTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            {...register("title", { required: true })}
            className={`mt-1 p-2 w-full border-gray-300 rounded-md ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Task Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskContent"
            className="block text-sm font-medium text-gray-700"
          >
            Task Content
          </label>
          <textarea
            id="taskContent"
            {...register("content", { required: true })}
            className={`resize-none mt-1 p-2 w-full border-gray-300 rounded-md ${errors.content ? "border-red-500" : ""}`}
            rows={4}
          ></textarea>
          {errors.content && (
            <span className="text-red-500 text-sm">
              Task Content is required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full "
        >
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default page;
