"use client"

import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { fetch, orgType } from '../../../constants/OrgQueryFN'
import { useSocket } from '../../socketProvider'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AppDispatch } from '../../state/store'
import { useDispatch } from 'react-redux'
import { inorg } from '../../state/org/orgSlice'
import { Avatar } from '../../../@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

function Orgs() {
  const router = useRouter()
  const dispatch:AppDispatch = useDispatch()
  const queryQulient = useQueryClient()
  const session = useSession()
  const user = session.data?.user
  const {joinRoom,clearMessages}=useSocket()
  const RoomJoin = async(roomname:string)=>{
    const res = await joinRoom(roomname)
    return res
  }
  const {data:orgs,isFetching}=useQuery({
    queryKey:["orgs"],
    queryFn:fetch
  })
  console.log(orgs);
  
  if (isFetching) {
    return <div>Is Fetching...</div>
    
  }
  const onSubmit =async(visitOrg:orgType)=>{
    const res = await RoomJoin(visitOrg.socketRoomName);
    if (res) {
      dispatch(inorg(visitOrg))
      
        await queryQulient.invalidateQueries({queryKey:["messages"]})
        clearMessages()
      router.push(`/message/organisations/${visitOrg.id}`)
    }
  }
  return (
   <main className=' h-full w-full mt-3'>
        {orgs?.map((org)=>(
          <div onClick={async()=> await onSubmit(org) } className=' flex flex-row gap-4 ml-4 items-center'>
            <Avatar>
              <AvatarImage src={org.avatar ?  org.avatar :""}></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h2>{org.name}</h2>
          </div>
        ))}
   </main>
  )
}

export default Orgs