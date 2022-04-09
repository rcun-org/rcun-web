export default () => {
    const userToken = localStorage.getItem('rcunUserToken')
    if (userToken) {
        return {
            Authorization: userToken
        }
    } else {
        return {}
    }
}
