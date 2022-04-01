import axios from "axios";
import authHeader from './auth-header'
const API_URL = process.env["REACT_APP_API_SERVER"]
export const createRoom = async ({title, yt_video_id}) => {
    try {
        return await axios.post(API_URL + 'room',
            {title, yt_video_id},
            {headers: authHeader()}
        )
    } catch (e) {
        return false
    }
}

