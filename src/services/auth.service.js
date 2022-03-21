import axios from "axios";

const API_URL = process.env.react_app_api_server

export const register = ({name, email, password, password2}) => {
    return axios.post(API_URL + 'users', {
        name,
        email,
        password,
        password2
    })
}

export const login = async ({email, password}) => {
    const response = axios.post(API_URL + 'users/login', {
        email,
        password
    })
    if (response.data.token) {
        localStorage.setItem("rcunUserToken", JSON.stringify(response.data.token))
    }
    return response.data
}

export const logout = () => {
    localStorage.removeItem('rcunUserToken')
}