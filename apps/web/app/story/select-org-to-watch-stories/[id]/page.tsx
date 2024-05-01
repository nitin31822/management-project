"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserStories } from '../../../../constants/userStoriesFn'
import { getOrgStories } from '../../../../constants/OrgQueryFN'


interface params{
    id:string
}
function OrgStories({ params }: { params: params }) {
    const {data:stories,isFetching}=useQuery({
        queryKey:["stories"],
        queryFn:async()=>await getOrgStories(params.id)
    })

    if (isFetching) {
        return <div>Is Fetching...</div>
    }

  return (
   <div>
    <h1>Stories of This Org</h1>
   
    {stories?.map((story)=>(
             
        <div className=' h-48 w-40 border border-black'>
          
            <h1 className=' text-black'>{story.name}</h1>
        </div>
    ))}

    
</div>
  )
}

export default OrgStories