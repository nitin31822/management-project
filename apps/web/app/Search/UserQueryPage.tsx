"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { searchOrgs, searchUser } from '../../constants/SearchQueryFn'
import { Avatar } from '@mui/material'
import { RootState } from '../state/store'
import {  useSelector } from 'react-redux'
import Card from '../../Components/Card'
import SearchComponent from '../../Components/SearchComponent'

interface params {
    query : string
}
function UserQueryPage() {
   const query = useSelector((state : RootState)=> state.query.query)
   if (!query){
    return <h1 className='Something Went wrong'></h1>
   }
   console.log(query);
   
    const {data , isLoading} = useQuery({
        queryKey : ["search/user"] ,
        queryFn : async () => await searchUser(query)
    })
 
    if (isLoading) {
      return <div>Search Query Loading</div>
    }
  return (
    <div>
      {data?.status ? 
        <div className=' flex flex-col gap-4 mt-5 lg:grid lg:grid-cols-2 lg:gap-3'>
        {data.users.map((user)=>(
       <Card Details={user} />
            
        ))}
       </div>
      : <div> Soory Cant find the user </div>}
    </div>
  )
}

export default UserQueryPage