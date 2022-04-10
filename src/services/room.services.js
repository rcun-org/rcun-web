import axios from "axios";
import authHeader from './auth-header'

const API_URL = process.env["REACT_APP_API_SERVER"]
export const createRoom = async ({title, yt_video_id}) => {
    try {
        await axios.post(API_URL + 'room',
            {title, yt_video_id},
            {
                headers: authHeader(),
            }
        )
        let roomsList = await getRooms()
        return roomsList
    } catch (e) {
        return false
    }
}

export const getRooms = async () => {
    try {
        const roomsData = await axios.get(API_URL + 'room')
        return roomsData.data
    } catch (e) {

    }
}

