"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { HoemPageQuery } from '../constants/HomePageQuery'
import Post from '../Components/Post'



function HomePage() {
  const {data , isLoading} = useQuery({
    queryKey : ["HoemPage"] ,
    queryFn  : async() => HoemPageQuery()
  })
  if (isLoading) {
    return <h1 className=' text-white'>Loading</h1>
  }
  return (
<main className=" flex flex-col gap-4">
  
  <div className=" flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
    {data?.posts.map((post) => <Post postData={post}></Post>)}
  </div>
</main>
  )
}

export default HomePage