import axios from "axios"




//save and update user 
export const saveOrUpdateUser = async(userData)=>{
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/user`,userData);

    return data

}