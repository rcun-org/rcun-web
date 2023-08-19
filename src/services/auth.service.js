import axios from "axios"

const API_URL = process.env["REACT_APP_API_SERVER"]

export const register = async ({ username, email, password, password2 }) => {
  try {
    return await axios.post(API_URL + "users", {
      username,
      email,
      password,
      password2,
    })
  } catch (e) {
    return false
  }
}

export const login = async ({ username, password }) => {
  // add auto-signup
  try {
    const reg = await register({
      username,
      password,
      password2: password,
      email: "",
    })
  } catch (e) {
    console.log("already signed up!")
  }
  try {
    const response = await axios.post(API_URL + "users/login", {
      username,
      password,
    })
    if (response.data.token) {
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

export const getLocalCurrentUserToken = () => {
  return localStorage.getItem("rcunUserToken")
}
