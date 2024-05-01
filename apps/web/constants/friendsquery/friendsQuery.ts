import axios from "axios";

export const getFriends=async()=>{
    const {data} = await axios.get('/api/friends/get-friends')
     return data.profile

}