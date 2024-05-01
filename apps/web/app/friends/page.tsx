"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriends } from '../../constants/friendsquery/friendsQuery'

function Friends() {
  const {data:profile,isFetching}=useQuery({
    queryKey:["profile"],
    queryFn:getFriends
  })

  if (isFetching) {
    return <div>Is Fetching...</div>
  }
  return (
   <>
  
   </>
  )
}

export default Friends