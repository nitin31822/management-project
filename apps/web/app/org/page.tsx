"use client"
import React from 'react'
import { fetch, orgType } from '../../constants/OrgQueryFN'
import { Org } from '@prisma/client'
import Link from 'next/link'
import {useQuery,useQueryClient} from "@tanstack/react-query"
import { inorg, org } from '../state/org/orgSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
import { useSocket } from '../socketProvider'
import Button from '../../my-components/Button'


 function page() {
const router = useRouter()

const dispatch : AppDispatch = useDispatch()
const queryClient = useQueryClient()
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
console.log( "orgs" ,orgs);

if (isFetching) {
  return <div>isFetching</div>
}

const visitOrg = async (visitOrg:orgType)=>{
  const res = await RoomJoin(visitOrg.socketRoomName);
  console.log(`vist wala res ${res}`);

  if (res) {
   await queryClient.invalidateQueries({queryKey : ["oorg"]})
  
  dispatch(inorg(visitOrg))
  router.push(`/org/${visitOrg.id}`) 
}
}
  
  return (
    
    <>

    <div>
      <button  className = "  lg:bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border border-black-500 hover:border-transparent rounded " onClick={()=>{router.push("/org/create-org")}}>Create Orgination</button>
    </div>
    <br />


    {orgs?.map((org )=>(
      <div onClick = {() => visitOrg(org) } key={org.socketRoomName}> 
        <div className='group border-solid border-2 hover:border-black ...' >
          <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <span className='font-medium text-gray-600 dark:text-gray-300'>{org.avatar}</span>

          </div>
          <br />
        <button className='text-black-600 group-hover:text-gray-900 no-underline hover:underline ' onClick = {() => visitOrg(org) } key={org.socketRoomName}>{org.name}</button>
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

    
    </>

   
  
  )
}

export default page