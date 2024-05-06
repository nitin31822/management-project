"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { useQuery } from '@tanstack/react-query'
import { searchOrgs, searchedItems } from '../../constants/SearchQueryFn'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/navigation'
import OrgSearchCard from '../../Components/OrgSearchCard'
import SearchComponent from '../../Components/SearchComponent'

function OrgQueryPage() {
    const query = useSelector((state : RootState)=> state.query.query)
    const router = useRouter()
    if (!query){
     return <h1>Something Went Wrong</h1>
    }
    const {data : orgs, isLoading} = useQuery({
        queryKey : ["search/orgs"] ,
        queryFn : async () => await searchOrgs(query)
    })
    if (isLoading) {
        return <div>Orgs Loading</div>
    }
    console.log( "orgs" ,orgs);
    
    const visitOrg = (org : searchedItems) => {
       router.push(`/org/${org.id}`)
    }
    
  return (
    <div>
         {orgs?.status ? 
          <div className=' flex flex-col gap-4 mt-5 lg:grid lg:grid-cols-2 lg:gap-3'>
            {orgs.orgs.map((org)=>(
                <OrgSearchCard Details={org} />
            ))}
          </div>
         : <div> 
            <h1>Soory Cant find Ogrs with Query</h1>
            </div>}
    </div>
  )
}

export default OrgQueryPage