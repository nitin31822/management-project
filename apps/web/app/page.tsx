"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { HoemPageQuery } from '../constants/HomePageQuery'



function HomePage() {
  const {data , isLoading} = useQuery({
    queryKey : ["HoemPage"] ,
    queryFn  : async() => HoemPageQuery()
  })
  if (isLoading) {
    return <h1 className=' text-white'>Loading</h1>
  }
  return (
  //  <main>
  //     <div>
  //       {data?.posts .map((post)=>(

  //       ))}
  //     </div>
  //  </main>
  <h1 className=' text-white'>Homepage</h1>
  )
}

export default HomePage