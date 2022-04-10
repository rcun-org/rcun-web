import axios from "axios";
import authHeader from './auth-header'

function prepareData(s) {
    if (s.indexOf("?v=") === -1) {
        alert("Invalid link :c");
        return "";
    }
    s = s.substring(s.indexOf("?v=") + 3);
    s = s.split('&')[0]
    return s;
}

const API_URL = process.env["REACT_APP_API_SERVER"]
export const createRoom = async ({title, yt_video_id}) => {
    yt_video_id = prepareData(yt_video_id);
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
    try {
        const roomsData = await axios.get(API_URL + 'room', {
            headers: authHeader(),
        })

        return roomsData.data
    } catch (e) {

    }
}

export const getRoomById = async (roomId) => {
    try {
        const roomData = await axios.get(`${API_URL}room/${roomId}`)
        return roomData.data
    }catch (e) {

    }
}

