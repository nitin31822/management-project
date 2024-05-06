"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

function StoryGeneral() {
  const story = useSelector((state:RootState)=>state.story.story)
  if (!story) {
    return <div>something Went Wrong</div>
    
  }
const org = story.org
  const group = {
    name: 'Group Name',
    coverImage: 'https://via.placeholder.com/800x400',
    avatar: 'https://via.placeholder.com/100',
  };
  const joinedUsers = [
    { id: 1, username: 'User1' },
    { id: 2, username: 'User2' },
    { id: 3, username: 'User3' },
  ];
  return (
    <div className=" h-[550px] bg-gray-800 text-white p-4">
    <header className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-3xl font-bold">{story.name}</h1>
        {/* <div className="flex items-center mt-2">
          <img
            src={group.avatar}
            alt="Group Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-sm">{group.name}</span>
        </div> */}
      </div>
      <button className="px-4 py-2 bg-gray-600 rounded">Leave Story</button>
    </header>
    {/* <div className="mb-4">
      <img src={group.coverImage} alt="Group Cover" className="w-full rounded-lg" />
    </div> */}
      <div>
        {/* Chat messages go here */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{org?.name}</span>
          </div>
          <p className="text-sm">Organisation of this Story</p>
        </div>
        {/* Repeat this structure for other messages */}
      </div>
    <div className="flex flex-col">
    <div>
        {/* Chat messages go here */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <img
              src={story.manager.avatar ? story.manager.avatar : ""}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{story.manager.name}</span>
          </div>
          <p className="text-sm">Story Manager</p>
        </div>
        {/* Repeat this structure for other messages */}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Team Members</h2>
        <ul>
          {story.employees.map((user) => (
            <li key={user.name}>{user.name}</li>
          ))}
        </ul>
      </div>
     
    </div>
   
  </div>
  )
}

export default StoryGeneral