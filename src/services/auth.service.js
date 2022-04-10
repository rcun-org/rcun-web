import axios from "axios";

const API_URL = process.env["REACT_APP_API_SERVER"]

export const register = async ({username, email, password, password2}) => {
    try {
        return await axios.post(API_URL + 'users', {
            username,
            email,
            password,
            password2
        })
    } catch (e) {
        return false
    }
}

export const login = async ({username, password}) => {
    try {
        const response = await axios.post(API_URL + 'users/login', {
            username,
            password
        })
        if (response.data.token) {
            // console.log("response.data.token", response.data.token, typeof response.data.token);
            console.log(response.data)
            localStorage.setItem("rcunUserToken", response.data.token)
        }
        return response.data.token
    } catch (e) {
        return false
    }
}

export const logout = () => {
    localStorage.removeItem("rcunUserToken")
}

export const getCurrentUserToken = () => {
    return localStorage.getItem("rcunUserToken");
};

