import React from 'react';
import { Avatar, AvatarImage , AvatarFallback } from '../@/components/ui/avatar';
import { searchedItems } from '../constants/SearchQueryFn';



const OrgSearchCard = ({Details} : {Details : searchedItems} ) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex items-center cursor-pointer ">
      {/* <img className="w-16 h-16 rounded-full mr-4 border border-white" src="" alt="User Avatar" /> */}
      <Avatar >
         <AvatarImage  src={Details.avatar ? Details.avatar : ""}/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=' ml-3'>
        <h2 className="text-xl font-semibold">{Details.name}</h2>
        <p className="text-gray-600">{Details.email}</p>
        {/* <p className="text-gray-800">{headline}</p> */}
      </div>
    </div>
  );
};

export default OrgSearchCard;
