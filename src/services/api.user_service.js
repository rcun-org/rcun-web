import axios from "axios";
import authHeader from './auth-header'

const API_URL = process.env["REACT_APP_API_SERVER"]

export const getUser = async () => {
     return await axios.get(`${API_URL}user`, {headers: authHeader()})
}