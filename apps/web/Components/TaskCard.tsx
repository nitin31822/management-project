"use client"
import React from 'react'
import { ITask } from '../app/socketProvider'


function TaskCard({task} : {task : ITask}) {
 

    return (
        <div className="bg-white shadow-md rounded-md p-4">
    <h2 className="text-lg font-semibold">{task.title}</h2>
    <p className="text-gray-600 mt-2">{task.content}</p>
    <div className="flex items-center mt-4">
      <span className="text-gray-700">Task Sender:</span>
      <p className="text-gray-700 ml-2 font-bold">{task.Manager.name} </p>
    </div>
    <div className="flex items-center mt-2">
      <span className="text-gray-700 ">Task Receiver:</span>
      <p className="text-gray-700 ml-2 font-bold">{task.employee.name}</p>
    </div>
  </div>
    )
}

export default TaskCard