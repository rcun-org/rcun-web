export default () => {
    const userToken = localStorage.getItem('rcunUserToken')
    // print("user token:", userToken)
    if (userToken) {
        return {
            Authorization: userToken
        }
    } else {
        return {}
    }
}
