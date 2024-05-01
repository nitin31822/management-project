
import Link from 'next/link'
import React , {useState} from 'react'
import { useRouter } from 'next/navigation'
interface item {
  slug : string ,

  name : string
}
function MessagesNavbar() {
  
    const navitems : Array<item> = [
        {
            name : "friends" ,
            
            slug : "/message/friends"
        } ,
        {
            name : "Organizations" ,
           
            slug : "/message/organisations"
        } ,
        {
            name : "stories" ,
         
            slug : "/message/stories"
        }
    ]

  return (
    <div className=' h-6 flex flex-row justify-center items-center gap-9' >
      {
        navitems.map((item) => (
            <Link key={item.slug }  href={item.slug}>{item.name}</Link>
        ))
      }
    </div>

  )
}

export default MessagesNavbar