import axios from "axios";
import authHeader from './auth-header';

const API_URL = process.env["REACT_APP_API_SERVER"];
export const createRoom = async ({title, yt_video_id}) => {
    // yt_video_id = prepareData(yt_video_id);
    try {
        const room = await axios.post(API_URL + 'room',
            {title, backupVideo: yt_video_id},
            {
                headers: authHeader(),
            }
        );
        return room.data;
    } catch (e) {
        return false;
    }
};

export const getRooms = async () => {
    try {
        const roomsData = await axios.get(API_URL + 'room', {
            headers: authHeader(),
        });
        return roomsData.data;
    } catch (e) {
        console.log("get rooms failed! :C", e)
    }
};
export const getRoomsDetails = async (rooms) => {
    try {
        for (let i = 0; i < rooms.length; i++) {
            const yt_video_info = (await axios.get('https://noembed.com/embed?url=' + rooms[i].backupVideo)).data
            rooms[i].yt_video_title = yt_video_info.title
        }
        return rooms;
    } catch (e) {
        console.log("could not get video details :C")
    }
};

export const getRoomById = async (roomId) => {
    try {
        const roomData = await axios.get(`${API_URL}room/${roomId}`);
        return roomData.data;
    } catch (e) {

    }
};

