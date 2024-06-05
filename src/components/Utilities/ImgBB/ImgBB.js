import axios from "axios";
import { toast } from "react-toastify";

export const uploadImage = async (image) => {

    try {
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_URL}`, formData);
        return data.data.display_url;
    }catch(err){
        return toast(err.message);
    }
    
}