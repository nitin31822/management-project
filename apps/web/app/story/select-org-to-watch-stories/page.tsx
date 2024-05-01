"use client"
import React, { use } from 'react'
import { fetch } from '../../../constants/OrgQueryFN'
import { useQuery } from '@tanstack/react-query'
import { Org } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { inorg } from '../../state/org/orgSlice'
import { useSocket } from '../../socketProvider'
import { AppDispatch } from '../../state/store'


function SelectOrg() {
    const router = useRouter()
    const dispatch:AppDispatch = useDispatch()
    const { joinRoom } = useSocket();
const RoomJoin = async (roomName: string) => {
  const res = await joinRoom(roomName);
  console.log(`join Room Response ${res} `);
  return res;
};
    const {data : orgs , isFetching} =  useQuery({
        queryKey : ["orgs"] ,
        queryFn  : fetch
      })
   
      
      if (isFetching) {
        return <div>isFetching</div>
      }
      const selectOrg= async(selectOrg:Org)=>{
        const res = await RoomJoin(selectOrg.socketRoomName);
         dispatch(inorg(selectOrg))

        router.push(`/story/select-org-to-watch-stories/${selectOrg.id}`)
      }
      
  return (
    <div>
       <h1>Select Organisation To See The Organisation Stories</h1>

       
    {orgs?.map((org )=>(
      <div onClick={()=>{selectOrg(org)}}  key={org.dbOrgName}> 
        <div className='group border-solid border-2 hover:border-black ...' >
          <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <span className='font-medium text-gray-600 dark:text-gray-300'>{org.avatar}</span>

          </div>
          <br />
        <button onClick={()=>{selectOrg(org)}} className='text-black-600 group-hover:text-gray-900 no-underline hover:underline '   key={org.dbOrgName}>{org.name}</button>
       <p className='text-black-500 group-hover:text-gray-800 ' key={org.id}>{org.bio}</p>
       <br />
       <p className='text-black-500 group-hover:text-gray-800 ' key={org.id}>{org.email}</p>

       <br />

       <div className="flex items-center -space-x-4">
    <div className="relative inline-block h-9 w-9 !rounded-full  border-2 border-black object-cover object-center hover:z-10 focus:z-10">{org.avatar}</div>
    and 10 others join this org
   </div>
      
        </div>
     
    
       </div>
    ))}

    </div>
  )
}

export default SelectOrg