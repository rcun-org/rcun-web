import axios from "axios";
import authHeader from './auth-header'

const API_URL = process.env["REACT_APP_API_SERVER"]
export const createRoom = async ({title, yt_video_id}) => {
    try {
        const room = await axios.post(API_URL + 'room',
            {title, yt_video_id},
            {
                headers: authHeader(),
            }
        )
        return room.data
    } catch (e) {
        return false
    }
}

export const getRooms = async () => {
    console.log('here')
    try {
        const roomsData = await axios.get(API_URL + 'room', {
            headers: authHeader(),
        })
        return roomsData.data
    } catch (e) {

    }
}

