import axios from "axios";
import authHeader from './auth-header'

const API_URL = process.env.react_app_api_server

export const getUser = () => {
    return axios.get(API_URL, {headers: authHeader()})
}