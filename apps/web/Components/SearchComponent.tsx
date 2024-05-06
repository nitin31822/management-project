"use client"
import React from 'react'
import { Input } from '../@/components/ui/input'
import { Button } from '../@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../app/state/store'
import { inQuery } from '../app/state/posts/querySlice'

interface FormQuery {
  query : string
}

function SearchComponent() {
  const queryClient = useQueryClient()
  const dispatch :AppDispatch = useDispatch()
  const router = useRouter()
  const {register , handleSubmit , reset} = useForm<FormQuery>({
    defaultValues : {
      query : ""
    }
  })

  const Search : SubmitHandler<FormQuery> = async(data) => {
   const searchQuery = data.query
   if (searchQuery.trim() !== "") {
     await queryClient.invalidateQueries({queryKey : ["search/orgs"]})
     await queryClient.invalidateQueries({queryKey : ["search/user"]})
     dispatch(inQuery(searchQuery))
     router.push("/Search")
   }
  }
  
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
     <form onSubmit={handleSubmit(Search)} className='flex w-full max-w-sm items-center space-x-2'>
     <Input type='search' placeholder="Search Here..." className='h-10' {...register("query")} />
     <Button className='bg-white' type="submit">Search</Button>
     </form>
  </div>
  )
}

export default SearchComponent