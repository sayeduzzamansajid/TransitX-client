import axios from 'axios'

export const imageURL = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data?.data?.display_url
}



//save and update user 
export const saveOrUpdateUser = async(userData)=>{
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/user`,userData);

    return data

}